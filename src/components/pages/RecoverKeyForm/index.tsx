'use client';

import { useActionState, useEffect } from 'react';
import { handleRecoverKey } from 'app/[lang]/recoverKey/actions';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import Button from '@components/micro/Button';
import styles from './styles.module.scss';
import FormLayout from '@components/macro/layout/FormLayout';
import { showToast, ToastType } from '@utils/toastService';
import { useCustomRouter } from '@hooks/useCustomRouter';
import { useTranslation } from '@hooks/useTranslation';
import ToastQueryTrigger from '@components/micro/ToastQueryTrigger';

export type RecoverKeyFormState =
  | { success: true; error?: undefined }
  | { success?: false; error: '' | 'wrongDataEntered' | 'noMatchingMail' | 'recoverKeyFailure' };

export default function RecoverKeyForm() {
  const { t } = useTranslation('recoverKey');
  const [formState, formAction] = useActionState<RecoverKeyFormState, FormData>(handleRecoverKey, { error: '' });
  const { pushTo } = useCustomRouter();

  useEffect(() => {
    if (formState.success) {
      showToast(t.emailSentConfirmation, ToastType.SUCCESS);
      pushTo('settingNewPassword');
    }

    if (formState.error === 'noMatchingMail') {
      showToast(t.emailRequired, ToastType.ERROR);
    }

    if (formState.error === 'recoverKeyFailure') {
      showToast(t.recoverError, ToastType.ERROR);
    }
  }, [formState]);

  return (
    <FormLayout>
      <ToastQueryTrigger queryKey="success" matchValue="1" message={t.loginSuccessMessage ?? 'Sesión iniciada con éxito'} type={ToastType.SUCCESS} />{' '}
      {/* Esto despues pasalo al home, no corresponde que este aca */}
      <div className={styles.recoverKeyContainer}>
        <h1>{t.newPassword}</h1>

        <p className={styles.mainDesc}>{t.changeDescription}</p>

        <form action={formAction}>
          <EmailInput name="email" label={t.email} placeholder={t.email} className={styles.input} />
          <Button kind="primary" size="large" type="submit" className={styles.sendBtn}>
            {t.sendEmail}
          </Button>
        </form>
      </div>
    </FormLayout>
  );
}
