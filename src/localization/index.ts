import en from './en';
import es from './es';

export type Translation = typeof en;

export interface Locale {
  id: string;
  label: string;
  default?: boolean;
  translation: Translation;
}

export const locales = Object.freeze<Locale[]>([
  { id: 'en-US', label: 'English - United States', translation: en },
  { id: 'es-AR', label: 'Español - Argentina', translation: es },
]);

export const defaultLocale = locales.find(locale => (locale as Locale).default) ?? locales[0]; //check if this broke something
