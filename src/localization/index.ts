import enUS from './en-US';
import esAr from './es-AR';

export type Translation = typeof enUS;

export interface Locale {
  id: string;
  label: string;
  default?: boolean;
  translation: Translation;
}

export const locales = Object.freeze<Locale[]>([
  { id: 'en-US', label: 'English - United States', translation: enUS },
  { id: 'es-AR', label: 'Español - Argentina', translation: esAr },
]);

export const defaultLocale = locales.find(locale => (locale as Locale).default) ?? locales[0]; //check if this broke something
