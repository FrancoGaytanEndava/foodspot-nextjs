import { notFound } from 'next/navigation';
import LoginForm from '@components/pages/LoginForm/LoginForm';
// import RegisterForm from '@components/pages/RegisterForm';

interface PageProps {
  params: {
    slug: string;
    lang: string;
  };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;

  switch (slug) {
    case 'login':
      return <LoginForm />;

    // case 'register':
    //   return <RegisterForm />;

    default:
      return notFound();
  }
}
