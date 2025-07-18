'use client';
import { useState, useRef } from 'react';
import { RegisterRequest } from '@models/user';
import { useAuth } from '@contexts/AuthContext';
import { showToast, ToastType } from '@utils/toastService';
import useLocalStorage from '@hooks/useLocalStorage';
import { localStorageKeys } from '@utils/localStorageKeys';
import { registering } from '@services/userService';
import { useRouter } from 'next/navigation';
import { Translation } from '@localization/index';

export interface SpecialDietOptions {
  isVegan: boolean;
  isVegetarian: boolean;
  isHypertensive: boolean;
  isCeliac: boolean;
}

export function useRegisterFormState(t: Translation['register']) {
  const [credentials, setCredentials] = useState<RegisterRequest>({
    email: '',
    password: '',
    repeatedPassword: '',
    name: '',
    lastName: '',
    specialDiet: [],
  });

  const [dietOptions, setDietOptions] = useState<SpecialDietOptions>({
    isVegan: false,
    isVegetarian: false,
    isHypertensive: false,
    isCeliac: false,
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const { setIsLoading } = useAuth();
  const [, setJWT] = useLocalStorage<string | null>(localStorageKeys.token, null);
  const router = useRouter();

  const updateField = (field: keyof RegisterRequest, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const updateDietOption = (field: keyof SpecialDietOptions, value: boolean) => {
    setDietOptions(prev => ({ ...prev, [field]: value }));
  };

  const resolveDiet = (): string[] => {
    const resolved: string[] = [];
    if (dietOptions.isVegan) resolved.push('vegan');
    if (dietOptions.isVegetarian) resolved.push('vegetarian');
    if (dietOptions.isHypertensive) resolved.push('hypertensive');
    if (dietOptions.isCeliac) resolved.push('celiac');
    return resolved;
  };

  const validatePassword = (pw: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pw);
  };

  const doPasswordsMatch = (): boolean => {
    return credentials.password === credentials.repeatedPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(credentials.password)) {
      showToast(t.wrongPassword, ToastType.ERROR);
      return;
    }
    if (!doPasswordsMatch()) {
      showToast(t.passwordArentMatching, ToastType.ERROR);
      return;
    }

    setIsLoading(true);
    try {
      const res = await registering({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        lastName: credentials.lastName,
        specialDiet: resolveDiet(),
      });
      setJWT(res._id);
      showToast(`${t.successMsg}!`, ToastType.SUCCESS);
      router.push('/login');
    } catch (e) {
      console.error(e);
      showToast(t.failureMsg, ToastType.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    updateField,
    dietOptions,
    updateDietOption,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordRef,
    confirmPasswordRef,
    handleSubmit,
  };
}
