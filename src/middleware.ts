import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_LOCALE = 'en-US';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;

    // Redirect root path to default locale
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
