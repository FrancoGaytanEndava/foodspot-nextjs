import { createContext, Dispatch, useContext, SetStateAction, useState, useEffect } from 'react';
import { defaultLocale, Translation, Locale, locales } from '../localization';
import { getObjectByKeys } from '../utils/common';
import useLocalStorage from '../hooks/useLocalStorage';
import { localStorageKeys } from '../utils/localStorageKeys';
import { NestedKeyOf } from '../utils/typeUtilities';

interface ILocalizationContext {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
}

const LocalizationContext = createContext<ILocalizationContext>({} as ILocalizationContext);

export function LocalizationProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [storedLocale, storeLocale] = useLocalStorage(localStorageKeys.locale, defaultLocale.id);

  const [locale, setLocale] = useState<Locale>(() => {
    const found = locales.find(x => x.id === storedLocale);
    return found ?? defaultLocale;
  });

  useEffect(() => {
    if (locale?.id) {
      storeLocale(locale.id);
    }
  }, [locale, storeLocale]);

  return (
    <LocalizationContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalizationContext(): ILocalizationContext {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error('useLocalizationContext must be used within a LocalizationProvider');
  }

  return context;
}

export function useTranslation(): Translation;
export function useTranslation<T = unknown>(key: NestedKeyOf<Translation>): T;
export function useTranslation<T = unknown>(key?: NestedKeyOf<Translation>): Translation | T {
  const context = useLocalizationContext();

  if (!context?.locale?.translation) {
    return {} as Translation;
  }

  const { locale } = context;
  return !key ? locale.translation : getObjectByKeys(locale.translation, key);
}
