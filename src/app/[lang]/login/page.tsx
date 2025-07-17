import LoginForm from '@components/pages/LoginForm';
import { getTranslationServer } from '@hooks/useTranslationServer';

export default async function LoginPage(props: { params: { lang: string } }) {
  const lang = await props.params.lang;
  const t = await getTranslationServer(lang, 'login');

  return <LoginForm t={t} lang={lang} />;
}
