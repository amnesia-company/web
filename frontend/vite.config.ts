/**
 * @file Vite configuration.
 *
 * Configures the build pipeline, development server, and module resolution
 * for the frontend application.
 *
 * Plugins:
 *   - `@vitejs/plugin-react` — React Fast Refresh and JSX transform.
 *   - `@rolldown/plugin-babel` with React Compiler preset — applies the
 *     experimental React Compiler for automatic memoisation.
 *   - `vike/plugin` — enables Vike file-based SSR routing.
 *   - `generate-sitemap` — generates `dist/client/sitemap.xml` and
 *     `dist/client/robots.txt` after build. Reads languages from
 *     `src/shared/locales/` filenames and static routes from `+route.ts`
 *     files (dynamic routes containing `@` are excluded). Domain is read
 *     from the `VITE_SITE_URL` environment variable.
 *
 * Path aliases map Feature-Sliced Design layer names to their corresponding
 * source directories so imports can be written as `import { Foo } from "shared"`
 * instead of relative paths.
 */
import { defineConfig, type Plugin } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';
import fs from 'fs';
import vike from "vike/plugin";

function readDefaultLanguage(): string {
    const content = fs.readFileSync(
        path.resolve(__dirname, "src/shared/const/const.ts"),
        "utf-8"
    );
    const match = content.match(/defaultAppLanguage\s*=\s*["']([^"']+)["']/);
    return match?.[1] ?? "en";
}

function collectRoutes(dir: string): string[] {
    const routes: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            routes.push(...collectRoutes(path.join(dir, entry.name)));
        } else if (entry.name === "+route.ts") {
            const content = fs.readFileSync(path.join(dir, entry.name), "utf-8");
            const match = content.match(/export default ["']([^"']+)["']/);
            if (match && !match[1].includes("@")) {
                routes.push(match[1]);
            }
        }
    }
    return routes;
}

function buildSitemap(siteUrl: string, routes: string[], languages: string[], defaultLang: string): string {
    const urls = routes.flatMap(route =>
        languages.map(lang => {
            const loc = `${siteUrl}${route}?lang=${lang}`;
            const alternates = languages
                .map(l => `        <xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}${route}?lang=${l}" />`)
                .join("\n");
            const xDefault = `        <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${route}?lang=${defaultLang}" />`;
            return `    <url>\n        <loc>${loc}</loc>\n${alternates}\n${xDefault}\n    </url>`;
        })
    );

    return [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
        `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
        ``,
        urls.join("\n\n"),
        ``,
        `</urlset>`,
    ].join("\n");
}

function sitemapPlugin(): Plugin {
    return {
        name: "generate-sitemap",
        closeBundle() {
            const siteUrl = (process.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

            const languages = fs
                .readdirSync(path.resolve(__dirname, "src/shared/locales"))
                .filter(f => f.endsWith(".json"))
                .map(f => f.replace(".json", ""));

            const routes = collectRoutes(path.resolve(__dirname, "src/app/router"));
            const defaultLang = readDefaultLanguage();

            const outDir = path.resolve(__dirname, "dist/client");
            if (fs.existsSync(outDir)) {
                fs.writeFileSync(
                    path.join(outDir, "sitemap.xml"),
                    buildSitemap(siteUrl, routes, languages, defaultLang),
                    "utf-8"
                );
                fs.writeFileSync(
                    path.join(outDir, "robots.txt"),
                    `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
                    "utf-8"
                );
            }
        },
    };
}

export default defineConfig({
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        vike({}),
        sitemapPlugin(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            shared: path.resolve(__dirname, 'src/shared'),
            entities: path.resolve(__dirname, 'src/entities'),
            features: path.resolve(__dirname, 'src/features'),
            widgets: path.resolve(__dirname, 'src/widgets'),
            pages: path.resolve(__dirname, 'src/pages'),
            processes: path.resolve(__dirname, 'src/processes'),
            app: path.resolve(__dirname, 'src/app'),
        },
    },
})
