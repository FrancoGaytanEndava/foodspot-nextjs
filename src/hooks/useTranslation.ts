'use client';

import { useParams } from 'next/navigation';
import { locales } from '@localization/index';

type TranslationNamespace = Record<string, any>;

interface UseTranslationResult<T> {
  t: T;
  lang: string;
}

export function useTranslation<T = TranslationNamespace>(namespace: string): UseTranslationResult<T> {
  const params = useParams();
  const lang = typeof params.lang === 'string' ? params.lang : 'en-US';

  const translations = locales.find(locale => locale.id === lang)?.translation[namespace] ?? locales[0].translation[namespace];

  return { t: translations, lang };
}
