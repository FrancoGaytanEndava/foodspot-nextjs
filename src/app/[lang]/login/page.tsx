import LoginForm from '@components/pages/LoginForm';
import { getTranslationServer } from '@hooks/useTranslationServer';

interface LoginPageProps {
  params: Promise<{ lang: string }>;
}

export default async function LoginPage(props: LoginPageProps) {
  const lang = (await props.params).lang;
  const t = await getTranslationServer(lang, 'login');

  return <LoginForm t={t} lang={lang} />;
}
