/**
 * Establece la cookie 'locale' con el id de idioma.
 */
export function setLocaleCookie(localeId: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `locale=${localeId}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }
}

/**
 * Lee el valor de la cookie 'locale' si existe.
 */
export function getLocaleFromCookie(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}
