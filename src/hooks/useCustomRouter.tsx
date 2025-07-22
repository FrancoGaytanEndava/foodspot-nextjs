'use client';

import { useRouter, useParams } from 'next/navigation';

function normalizePath(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}

export function useCustomRouter() {
  const router = useRouter();
  const params = useParams();

  const lang = typeof params.lang === 'string' ? params.lang : '';

  const pushTo = (path: string) => {
    const finalPath = `/${lang}/${normalizePath(path)}`;
    router.push(finalPath);
  };

  const replaceTo = (path: string) => {
    const finalPath = `/${lang}/${normalizePath(path)}`;
    router.replace(finalPath);
  };

  const reloadPage = (path: string) => {
    const finalPath = `/${lang}/${normalizePath(path)}`;
    router.push(finalPath);
  };

  const goBack = () => {
    router.back();
  };

  const switchLanguage = (langId: string, pathname: string) => {
    document.cookie = `locale=${langId}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const newPath = pathname.replace(/^\/[a-zA-Z-]+(?=\/|$)/, `/${langId}`);
    router.push(newPath);
  };

  return {
    pushTo,
    replaceTo,
    reloadPage,
    goBack,
    lang,
    switchLanguage,
  };
}
