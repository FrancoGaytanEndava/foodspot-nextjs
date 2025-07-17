import LoginForm from '@components/pages/LoginForm';
import { getTranslations } from '@hooks/useTranslationServer';

interface LoginPageProps {
  params: Promise<{ lang: string }>;
}

export default async function LoginPage(props: LoginPageProps) {
  const lang = (await props.params).lang;
  const t = getTranslations(lang, 'login');

  return <LoginForm t={t} lang={lang} />;
}
