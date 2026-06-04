/**
 * Test-scoped i18next instance.
 * Returns translation keys as-is instead of translated strings, making it
 * straightforward to assert that components use the correct translation keys.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',
    ns: ['translation'],
    defaultNS: 'translation',
    resources: {
        ru: { translation: {} },
    },
    interpolation: { escapeValue: false },
});

export default i18n;
