'use server';

import { forgotPassword } from '@services/passwordServerService';
import { RecoverKeyFormState } from '@components/pages/RecoverKeyForm';

export async function handleRecoverKey(_prevState: RecoverKeyFormState, formData: FormData): Promise<RecoverKeyFormState> {
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return { error: 'wrongDataEntered' };
  }

  try {
    await forgotPassword({ email });
    return { success: true };
  } catch (err) {
    //dependiendo del error puede haber devuelto noMatchingMail o recoverKeyFailure, fijate que vuelve y agregalo
    console.error('Error en forgotPassword', err);
    return { error: 'noMatchingMail' };
  }
}
