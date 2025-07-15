'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { recoverPassword, verifyCode } from '@services/password';
import { AlertTypes } from '@components/micro/AlertPopup';
import { useAlert } from '@contexts/AlertContext';

interface InitialNewPasswordInterface {
  userEmail: string;
  userVerificationCode: string;
  userPassword: string;
  userConfirmedPassword: string;
}

export function useSettingNewPasswordState(lang) {
  const router = useRouter();
  const { setAlert } = useAlert();

  const [credentials, setCredentials] = useState<InitialNewPasswordInterface>({
    userEmail: '',
    userVerificationCode: '',
    userPassword: '',
    userConfirmedPassword: '',
  });

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const updateField = (key: keyof InitialNewPasswordInterface, value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const validatePassword = (password: string): boolean => {
    const expReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return expReg.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (credentials.userPassword !== credentials.userConfirmedPassword) {
      setAlert(lang.passwordsDontMatch, AlertTypes.ERROR);
      return;
    }

    if (!validatePassword(credentials.userPassword)) {
      setAlert(lang.wrongPassword, AlertTypes.ERROR);
      return;
    }

    try {
      await verifyCode({
        email: credentials.userEmail,
        verificationCode: credentials.userVerificationCode,
      });

      await recoverPassword({
        email: credentials.userEmail,
        verificationCode: credentials.userVerificationCode,
        password: credentials.userPassword,
      });

      setAlert(lang.emailChangedSuccessfully, AlertTypes.INFO);
      setTimeout(() => router.push('/login'), 1000);
    } catch (e) {
      console.error(e);
      setAlert(lang.couldntUpdatePassword, AlertTypes.ERROR);
    }
  };

  return {
    credentials,
    updateField,
    handleSubmit,
    passwordRef,
    confirmPasswordRef,
  };
}
