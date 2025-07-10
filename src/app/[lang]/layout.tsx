import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';

import { Providers } from './providers';
import '@styles/main.scss';
import '@styles/globals.css';

// Next incluye fuentes de Google por defecto, pero si queres usar una fuente diferente podes importarla.
// En este caso, se esta usando la fuente Geist y Geist Mono.
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodSpot-NextJs',
  description: 'FoodSpot es una aplicacion de gestion de eventos y usuarios',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout(props: RootLayoutProps) {
  const localParams = await props.params;
  const lang = localParams.lang;

  return (
    <html lang={lang}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers lang={lang}>{props.children}</Providers>
      </body>
    </html>
  );
}
