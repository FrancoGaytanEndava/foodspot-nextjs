'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState, ReactNode } from 'react';
import { defaultLocale, locales, Locale, Translation } from '@localization/index';
import { usePathname } from 'next/navigation';
import { getObjectByKeys } from '@utils/common';
import { GetNestedValue, NestedKeyOf } from '@utils/typeUtilities';
import { getLocaleFromCookie, setLocaleCookie } from '@utils/localeCookies';

interface ILocalizationContext {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
}

const LocalizationContext = createContext<ILocalizationContext>({} as ILocalizationContext);

interface LocalizationProviderProps {
  children: ReactNode;
  lang?: string;
}

export function LocalizationProvider({ children, lang }: LocalizationProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const pathname = usePathname();

  useEffect(() => {
    const langId = lang ?? pathname.split('/')[1];
    const matched = locales.find(l => l.id.toLowerCase() === langId?.toLowerCase());

    if (matched && matched.id !== locale.id) {
      setLocale(matched);
      setLocaleCookie(matched.id);
    } else if (!matched) {
      const fromCookie = getLocaleFromCookie();
      const fallback = locales.find(l => l.id === fromCookie);
      if (fallback) {
        setLocale(fallback);
        setLocaleCookie(fallback.id);
      } else {
        setLocale(defaultLocale);
        setLocaleCookie(defaultLocale.id);
      }
    }
  }, [pathname, lang]);

  return <LocalizationContext.Provider value={{ locale, setLocale }}>{children}</LocalizationContext.Provider>;
}

export function useLocalizationContext(): ILocalizationContext {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalizationContext must be used within a LocalizationProvider');
  }
  return context;
}

export function useTranslation<K extends NestedKeyOf<Translation>>(key: K): GetNestedValue<Translation, K> {
  const { locale } = useLocalizationContext();
  return locale?.translation ? getObjectByKeys(locale.translation, key) : ({} as GetNestedValue<Translation, K>);
}
