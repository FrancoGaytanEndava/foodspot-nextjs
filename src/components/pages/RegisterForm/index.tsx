'use client';

import { useActionState, useEffect } from 'react';
import { handleRegister } from 'app/[lang]/register/actions';
import FormLayout from '@components/macro/layout/FormLayout';
import Button from '@components/micro/Button';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import TextInput from '@components/micro/Inputs/TextInput';
import styles from './styles.module.scss';
import { showToast, ToastType } from '@utils/toastService';
import { useTranslation } from '@hooks/useTranslation';

export type RegisterFormState = { success: true; error?: undefined } | { success?: false; error: 'passwordMismatch' | 'registerFailed' };

export default function RegisterForm() {
  const [formState, formAction] = useActionState<RegisterFormState, FormData>(handleRegister, { error: 'registerFailed' });
  const { t, lang } = useTranslation('register');

  useEffect(() => {
    if (formState.success) {
      showToast(t.successMsg, ToastType.SUCCESS);
    }

    if (formState.error === 'registerFailed') {
      showToast(t.failureMsg, ToastType.ERROR);
    }

    if (formState.error === 'passwordMismatch') {
      showToast(t.passwordArentMatching, ToastType.WARNING);
    }
  }, [formState]);

  return (
    <FormLayout>
      <form action={formAction}>
        <input type="hidden" name="lang" value={lang} />

        <h3 className={styles.title}>{t.registerTitle}</h3>

        <div className={styles.inputSection}>
          <div className={styles.firstColumn}>
            <TextInput name="name" label={t.name} placeholder={t.name} />
            <TextInput name="lastName" label={t.lastName} placeholder={t.lastName} />
            <EmailInput name="email" label={t.email} placeholder={t.emailPlaceholder} />
          </div>

          <div className={styles.secondColumn}>
            <PasswordInput name="password" label={t.password} placeholder={t.passwordPlaceholder} />
            <span className={styles.inputDescription}>{t.passwordDescription}</span>

            <PasswordInput name="repeatedPassword" label={t.confirmPassword} placeholder={t.passwordPlaceholder} />

            <div>
              <div className={styles.specialDietTitle}>
                {t.specialDiet} <span className={styles.inputDescription}>{t.specialDietOptional}</span>
              </div>

              <div className={styles.checkboxGroup}>
                <label>
                  <input type="checkbox" name="specialDiet" value="vegan" /> {t.specialDietOptions.vegan}
                </label>
                <label>
                  <input type="checkbox" name="specialDiet" value="vegetarian" /> {t.specialDietOptions.vegetarian}
                </label>
                <label>
                  <input type="checkbox" name="specialDiet" value="hypertensive" /> {t.specialDietOptions.hypertensive}
                </label>
                <label>
                  <input type="checkbox" name="specialDiet" value="celiac" /> {t.specialDietOptions.celiac}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button kind="primary" size="large" type="submit">
            {t.registerBtn}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
