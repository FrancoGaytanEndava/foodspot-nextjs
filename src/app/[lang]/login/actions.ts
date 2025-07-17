'use server';

import { cookies } from 'next/headers';
import { loginServer } from '@services/authServerService';
import { LoginRequest } from '@models/user';
import { redirect } from 'next/navigation';

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const lang = formData.get('lang') as string;

  console.log('este es el lang: ' + lang);

  try {
    const payload: LoginRequest = { email, password };
    const res = await loginServer(payload);
    const token = res.jwt;

    if (!res?.jwt) throw new Error('Token no recibido');

    const cookieStore = await cookies();
    cookieStore.set('jwt', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === 'production',
    });

    const saved = cookieStore.get('jwt');
    console.log('📦 JWT seteado:', saved?.value);
    //redirect(`/${lang}`);
  } catch (err) {
    redirect(`/${lang}/login?error=invalid`);
    console.log(err);
  }
}
