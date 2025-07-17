import LoginForm from '@components/pages/LoginForm';
import { getTranslationServer } from '@hooks/useTranslationServer';

export default async function LoginPage(props: any) {
  const lang = props?.params?.lang ?? 'es-AR';
  const t = await getTranslationServer(lang, 'login');

  return <LoginForm t={t} lang={lang} />;
}
