import { type ReactNode, useMemo } from 'react';
import { createInstance } from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { usePageContext } from 'vike-react/usePageContext';

import en from "shared/locales/en.json";
import ru from "shared/locales/ru.json";
import {defaultAppLanguage} from "shared/const/const";

const resources = {
    en: { translation: en },
    ru: { translation: ru },
};

/**
 * Internationalisation provider.
 *
 * Creates a per-locale i18next instance using the locale resolved server-side
 * from the Accept-Language header and passed to the client via Vike pageContext.
 * Falls back to English when the locale has no available translations.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
    const { locale } = usePageContext();

    const i18nInstance = useMemo(() => {
        const instance = createInstance();
        instance.use(initReactI18next).init({
            resources,
            lng: locale,
            fallbackLng: defaultAppLanguage,
            interpolation: { escapeValue: false },
        });
        return instance;
    }, [locale]);

    return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
