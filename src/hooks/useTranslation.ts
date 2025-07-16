'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type TranslationNamespace = Record<string, any>;

interface UseTranslationResult<T> {
  t: T;
  lang: string;
}

export function useTranslation<T = TranslationNamespace>(namespace: string): UseTranslationResult<T> {
  const params = useParams();
  const lang = typeof params.lang === 'string' ? params.lang : 'en-US';
  const [t, setT] = useState<T>({} as T);

  useEffect(() => {
    const loadTranslation = async () => {
      try {
        const mod = await import(`../localization/${lang}/index.ts`);
        const data = mod.default;
        setT(data?.[namespace] || {});
      } catch (err) {
        console.error(`Error loading translation: /${lang}/${namespace}`, err);
        setT({} as T);
      }
    };

    loadTranslation();
  }, [lang, namespace]);

  return { t, lang };
}
