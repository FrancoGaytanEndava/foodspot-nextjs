import LoginForm from '@components/pages/LoginForm';
import { getTranslationServer } from '@hooks/useTranslationServer';

interface PageProps {
  params: { lang: string };
}

export default async function LoginPage(props: PageProps) {
  const lang = props.params.lang;
  const t = await getTranslationServer(lang, 'login');

  return <LoginForm t={t} />;
}
