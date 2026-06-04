import { type ReactNode, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { principalUserMock, setUserInfo } from 'entities/user';
import { selectLanguage, setLanguage } from 'entities/appConfig';
import { useTranslation } from 'react-i18next';
import { usePageContext } from 'vike-react/usePageContext';
import { defaultAppLanguage } from 'shared/const/const';

/**
 * Application initialization provider.
 *
 * On mount, dispatches the initial authenticated user data to the Redux store.
 * On each navigation, syncs the active language by priority:
 * 1. ?lang= from the URL (explicit user choice)
 * 2. language from Redux (preserved within the current session, reset on refresh)
 * 3. locale from Vike page context (Accept-Language from the server)
 * Sets document.documentElement.lang, calls i18n.changeLanguage, and appends
 * ?lang= to the URL if one is not already present.
 */
export function InitProvider({ children }: { children?: ReactNode }) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { locale, urlPathname } = usePageContext();
  const reduxLang = useSelector(selectLanguage);
  const reduxLangRef = useRef(reduxLang);

  useEffect(() => {
    reduxLangRef.current = reduxLang;
  });

  useEffect(() => {
    dispatch(setUserInfo(principalUserMock));
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    const activeLang = urlLang || reduxLangRef.current || locale || defaultAppLanguage;

    dispatch(setLanguage(activeLang));
    document.documentElement.lang = activeLang;
    i18n.changeLanguage(activeLang).catch((err) => console.error('change language error:', err));

    if (!urlLang) {
      params.set('lang', activeLang);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  }, [locale, i18n, urlPathname, dispatch]);

  return <>{children}</>;
}
