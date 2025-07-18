import RegisterForm from '@components/pages/RegisterForm';
import { getTranslations } from '@hooks/useTranslationServer';

interface RegisterPageProps {
  params: Promise<{ lang: string }>;
}

export default async function RegisterPage(props: RegisterPageProps) {
  const lang = (await props.params).lang;
  const t = getTranslations(lang, 'register');
  return <RegisterForm t={t} lang={lang} />;
}
