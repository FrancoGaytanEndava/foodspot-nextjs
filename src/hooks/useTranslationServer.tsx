type TranslationNamespace = Record<string, any>;

export async function getTranslationServer<T = TranslationNamespace>(lang: string, namespace: string): Promise<T> {
  try {
    const mod = await import(`../localization/${lang}/index.ts`);
    const data = mod.default;
    return data?.[namespace] || {};
  } catch (err) {
    console.error(`Error loading translation: /${lang}/${namespace}`, err);
    return {} as T;
  }
}
