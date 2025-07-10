import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = 'en-US';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si es un archivo público (imagen, .css, etc), no hacemos nada
  if (pathname.startsWith('/api') || PUBLIC_FILE.test(pathname) || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const segments = pathname.split('/');
  const possibleLang = segments[1];

  // Si la URL ya tiene idioma (ej: /en-US/...), no hacemos nada
  const supportedLocales = ['en-US', 'es-AR'];
  if (supportedLocales.includes(possibleLang)) {
    return NextResponse.next();
  }

  // Si no tiene idioma en la URL, redireccionamos a /[DEFAULT_LOCALE]/...
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
