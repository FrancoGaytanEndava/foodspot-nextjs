'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { _login } from '@services/authService';

export async function loginAction(_prevState: any, formData: FormData): Promise<{ error?: string }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await _login({ email, password });
    const token = res.jwt;

    (cookies() as any).set('jwt', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === 'production',
    });

    redirect('/');
  } catch (error) {
    console.log(error);
    return { error: 'Credenciales inválidas' };
  }
}
