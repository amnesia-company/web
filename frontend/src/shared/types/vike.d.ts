declare global {
    namespace Vike {
        interface PageContext {
            /** Browser locale resolved server-side from the Accept-Language header. */
            locale: string;
        }
    }
}

export {};
