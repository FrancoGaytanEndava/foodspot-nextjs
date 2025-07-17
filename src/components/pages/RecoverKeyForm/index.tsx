'use client';
/* 
import { useState } from 'react';
import { forgotPassword } from '@services/password'; */
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import Button from '@components/micro/Button';
import styles from './styles.module.scss';
import FormLayout from '@components/macro/layout/FormLayout';
import { useCustomRouter } from '@hooks/useCustomRouter';
import { showToast, ToastType } from '@utils/toastService';
import { useTranslation } from '@hooks/useTranslation';

export default function RecoverKeyForm() {
  const { t } = useTranslation('recoverKey');
  /*   const [userEmail, setUserEmail] = useState(''); */
  const customRouter = useCustomRouter();

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      /*       await forgotPassword({ email: userEmail }); */
      customRouter.pushTo('settingNewPassword');
      showToast(t.emailSentConfirmation, ToastType.SUCCESS);
    } catch (e) {
      console.error(e);
      showToast('error', ToastType.ERROR);
    }
  }

  return (
    <FormLayout>
      <div className={styles.recoverKeyContainer}>
        <h1>{t.newPassword}</h1>

        <p className={styles.mainDesc}>{t.changeDescription}</p>

        <EmailInput name={t.email} label={t.email} placeholder={t.email} className={styles.input} />

        <Button kind="primary" size="large" id="registerBtn" onClick={handleSubmit} className={styles.sendBtn}>
          {t.sendEmail}
        </Button>
      </div>
    </FormLayout>
  );
}
