'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalizationContext, useTranslation } from '@contexts/LocalizationContext';
import { useAlert } from '@contexts/AlertContext';
import { forgotPassword } from '@services/password';
import { AlertTypes } from '@components/micro/AlertPopup';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import Button from '@components/micro/Button';
import styles from './styles.module.scss';
import FormLayout from '@components/macro/layout/FormLayout';
import { showAlert } from '@utils/alertService';
import AlertPortal from '@components/micro/AlertPortal/AlertPortal';

export default function RecoverKeyForm() {
  const lang = useTranslation('recoverKey');
  const [userEmail, setUserEmail] = useState('');
  const { setAlert } = useAlert();
  const router = useRouter();
  const { getUrlClient } = useLocalizationContext();

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await forgotPassword({ email: userEmail });
      router.push(getUrlClient('settingNewPassword'));
      showAlert('Recover email sent!', AlertTypes.INFO);
    } catch (e) {
      console.error(e);
      setAlert('error', AlertTypes.ERROR);
    }
  }

  return (
    <FormLayout>
      <AlertPortal />
      <div className={styles.recoverKeyContainer}>
        <h1>{lang.newPassword}</h1>

        <p className={styles.mainDesc}>{lang.changeDescription}</p>

        <EmailInput label={lang.email} placeholder={lang.email} value={userEmail} onChange={setUserEmail} className={styles.input} />

        <Button kind="primary" size="large" id="registerBtn" onClick={handleSubmit} className={styles.sendBtn}>
          {lang.sendEmail}
        </Button>
      </div>
    </FormLayout>
  );
}
