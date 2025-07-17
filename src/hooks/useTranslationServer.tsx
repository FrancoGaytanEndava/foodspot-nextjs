import { locales } from '@localization/index';

type TranslationNamespace = Record<string, any>;

export function getTranslations<T = TranslationNamespace>(lang: string, namespace: string): T {
  const translations = locales.find(locale => locale.id === lang)?.translation[namespace];

  return (translations ?? locales[0].translation[namespace]) as T;
}
