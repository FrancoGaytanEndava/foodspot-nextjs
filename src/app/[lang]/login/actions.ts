'use server';

import { cookies } from 'next/headers';
import { loginServer } from '@services/authServerService';
import { LoginRequest } from '@models/user';
import { redirect } from 'next/navigation';

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const lang = formData.get('lang') as string;
  let isLoginSuccess = false;

  try {
    const payload: LoginRequest = { email, password };
    const { jwt, id, name } = await loginServer(payload);

    if (!jwt) throw new Error('Token no recibido');

    const cookieStore = await cookies();
    cookieStore.set('jwt', jwt, {
      httpOnly: true, // just for the server (authentication)
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === 'production',
    });

    cookieStore.set('user', JSON.stringify({ id, name }), {
      httpOnly: false, // accesible for the client as well
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === 'production',
    });

    const saved = cookieStore.get('jwt');
    console.log('JWT seteado:', saved?.value);
    isLoginSuccess = true;
  } catch (err) {
    console.log(err);
  }

  if (isLoginSuccess) {
    redirect(`/${lang}/eventHome?success=1`); //despues hace lo mismo que hiciste en el login para el error, pero dentro de homeEvent con el ToastQueryTrigger en success
  } else {
    redirect(`/${lang}/login?error=invalid`);
  }
}
