import RegisterForm from '@components/pages/RegisterForm';
import { getTranslations } from '@hooks/useTranslationServer';

export default async function RegisterPage(props: { params: { lang: string } }) {
  const lang = (await props.params).lang;
  const t = getTranslations(lang, 'register');
  return <RegisterForm t={t} lang={lang} />;
}
