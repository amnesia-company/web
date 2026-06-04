# Amnesia — Frontend

This repository is a submodule of the main [Amnesia](https://github.com/Bitsulov/Amnesia-server) repository.

## Environment Variables

Copy `.env.example` to `.env` and fill in the values.

| Variable              | Description                       |
| --------------------- | --------------------------------- |
| `VITE_SITE_URL`       | Public site URL                   |
| `VITE_SERVER_ADDRESS` | Game server address               |
| `PORT`                | HTTP server port (default `3000`) |

## Quick Start

**Development mode**

```bash
npm install
npm run dev
```

**Preview mode**

```bash
npm install
npm run preview
```

Production deployment is managed from the main [Amnesia]() repository via Docker Compose.

## Commands

| Command                  | Description                            |
| ------------------------ | -------------------------------------- |
| `npm run dev`            | Start the development server           |
| `npm run build`          | Build the project                      |
| `npm run typecheck`      | Type checking                          |
| `npm run lint`           | Linting                                |
| `npm run test`           | Unit tests in watch mode               |
| `npm run test:run`       | Single unit test run                   |
| `npm run test:coverage`  | Coverage report (threshold 65%)        |
| `npm run test:ui`        | Vitest UI dashboard                    |
| `npm run test:e2e`       | E2E tests (Playwright)                 |
| `npm run test:e2e:ui`    | Playwright UI dashboard                |
| `npm run test:e2e:debug` | E2E test debugging                     |
| `npm run test:all`       | Full check: lint + types + units + e2e |

## Tech Stack

**Core**

- React 19 + TypeScript
- Vite — bundler
- Vike — server-side rendering (SSR) and routing
- SCSS Modules — styling

**State & Data**

- Redux Toolkit — client state
- TanStack Query — server data

**Internationalisation**

- i18next

**Testing**

- Vitest + Testing Library — unit and integration tests
- MSW — API mocking in tests
- Playwright — E2E tests

**Visual Regression Screenshots**

Baseline screenshots are stored in `e2e/<suite>-snapshots/`. When the UI changes, update them manually.

| Command                                                   | Description                             |
| --------------------------------------------------------- | --------------------------------------- |
| `npx playwright test --update-snapshots`                  | Update all screenshots                  |
| `npx playwright test e2e/home.spec.ts --update-snapshots` | Update screenshots for one file         |
| `npx playwright test -g "test name" --update-snapshots`   | Update screenshot for one specific test |

## Architecture: Feature-Sliced Design

Layers are ordered from bottom to top — upper layers import from lower ones, never the other way around.

| Layer       | Purpose                                                     |
| ----------- | ----------------------------------------------------------- |
| `shared/`   | Reusable utilities, hooks, types, locales, test helpers     |
| `entities/` | Domain models: entities, Redux slices, types, mocks         |
| `features/` | User scenarios: logic + UI                                  |
| `widgets/`  | Compositions of features and entities for reusable sections |
| `pages/`    | Full-screen views composed from widgets                     |
| `app/`      | Entry point, providers, routing, Redux store                |

## Docker

The project uses a multi-stage Dockerfile:

- **Dev** — Node.js with Hot Module Replacement
- **Prod** — optimised SSR build served behind Nginx

## Links

- [Amnesia](https://github.com/Bitsulov/Amnesia) — main repository
- Backend — coming soon
