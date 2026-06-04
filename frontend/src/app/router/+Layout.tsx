import {App} from "app/App";
import type {ReactNode} from "react";

/**
 * Root layout component for the Vike routing system.
 *
 * Applied as a wrapper to every page in the application.
 * This component receives the rendered page as children and wraps it in
 * the App component, which provides the Redux store, i18next
 * internationalization context, and the initialization logic to all pages.
 *
 * @see App - the component that supplies all application-wide providers.
 */
export default function Layout({ children }: { children: ReactNode }) {
    return <App>{children}</App>
}
