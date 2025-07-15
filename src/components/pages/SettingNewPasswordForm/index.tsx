'use client';

import { useState, useRef } from 'react';
import FormLayout from '@components/macro/layout/FormLayout';
import { useTranslation } from '@contexts/LocalizationContext';
import { useRouter } from 'next/navigation';
import { useAlert } from '@contexts/AlertContext';
import { recoverPassword, verifyCode } from '@services/password';
import AlertPopup, { AlertTypes } from '@components/micro/AlertPopup';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import TextInput from '@components/micro/Inputs/TextInput';
import Button from '@components/micro/Button';
import styles from './styles.module.scss';

interface InitialNewPasswordInterface {
  userEmail: string;
  userVerificationCode: string;
  userPassword: string;
  userConfirmedPassword: string;
}

export default function SettingNewPasswordForm() {
  const lang = useTranslation('settingNewPassword');
  const router = useRouter();
  const { setAlert } = useAlert();

  const [newPassword, setNewPassword] = useState<InitialNewPasswordInterface>({
    userEmail: '',
    userVerificationCode: '',
    userPassword: '',
    userConfirmedPassword: '',
  });

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const validatePassword = (password: string): boolean => {
    const expReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return expReg.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.userPassword !== newPassword.userConfirmedPassword) {
      setAlert(lang.passwordsDontMatch, AlertTypes.ERROR);
      return;
    }

    if (!validatePassword(newPassword.userPassword)) {
      setAlert(lang.wrongPassword, AlertTypes.ERROR);
      return;
    }

    try {
      await verifyCode({
        email: newPassword.userEmail,
        verificationCode: newPassword.userVerificationCode,
      });

      await recoverPassword({
        email: newPassword.userEmail,
        verificationCode: newPassword.userVerificationCode,
        password: newPassword.userPassword,
      });

      setAlert(lang.emailChangedSuccessfully, AlertTypes.INFO);
      setTimeout(() => router.push('/login'), 1000);
    } catch (e) {
      console.log(e);
      setAlert(lang.couldntUpdatePassword, AlertTypes.ERROR);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <AlertPopup />
      <div className={styles.settingNewPasswordContainer}>
        <h1>{lang.setNewPasswordTitle}</h1>

        <EmailInput
          label={lang.email}
          placeholder={lang.email}
          value={newPassword.userEmail}
          onChange={val => setNewPassword(prev => ({ ...prev, userEmail: val }))}
        />

        <TextInput
          label={lang.verificationCode}
          placeholder={lang.verificationCode}
          value={newPassword.userVerificationCode}
          onChange={val => setNewPassword(prev => ({ ...prev, userVerificationCode: val }))}
        />

        <PasswordInput
          label={lang.password}
          placeholder={lang.password}
          value={newPassword.userPassword}
          onChange={val => setNewPassword(prev => ({ ...prev, userPassword: val }))}
          inputRef={passwordRef}
        />

        <p className={styles.mainDesc}>{lang.passwordDescription}</p>

        <PasswordInput
          label={lang.confirmPassword}
          placeholder={lang.confirmPassword}
          value={newPassword.userConfirmedPassword}
          onChange={val => setNewPassword(prev => ({ ...prev, userConfirmedPassword: val }))}
          inputRef={confirmPasswordRef}
        />

        <Button type="submit" kind="primary" size="large" id="registerBtn" style={{ marginBottom: 30 }}>
          {lang.setKeyBtn}
        </Button>
      </div>
    </FormLayout>
  );
}
