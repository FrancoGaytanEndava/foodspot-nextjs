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

interface RegisterFormProps {
  t: Record<string, any>;
  lang: string;
}

export type RegisterFormState = { success: true; error?: undefined } | { success?: false; error: 'passwordMismatch' | 'registerFailed' };

export default function RegisterForm(props: RegisterFormProps) {
  const [formState, formAction] = useActionState<RegisterFormState, FormData>(handleRegister, { error: 'registerFailed' });

  useEffect(() => {
    if (formState.success) {
      showToast(props.t.successMsg, ToastType.SUCCESS);
    }

    if (formState.error === 'registerFailed') {
      showToast(props.t.failureMsg, ToastType.ERROR);
    }

    if (formState.error === 'passwordMismatch') {
      showToast(props.t.passwordArentMatching, ToastType.WARNING);
    }
  }, [formState]);

  return (
    <FormLayout>
      <form action={formAction}>
        <input type="hidden" name="lang" value={props.lang} />

        <h3 className={styles.title}>{props.t.registerTitle}</h3>

        <div className={styles.inputSection}>
          <div className={styles.firstColumn}>
            <TextInput name="name" label={props.t.name} placeholder={props.t.name} />
            <TextInput name="lastName" label={props.t.lastName} placeholder={props.t.lastName} />
            <EmailInput name="email" label={props.t.email} placeholder={props.t.emailPlaceholder} />
          </div>

          <div className={styles.secondColumn}>
            <PasswordInput name="password" label={props.t.password} placeholder={props.t.passwordPlaceholder} />
            <span className={styles.inputDescription}>{props.t.passwordDescription}</span>

            <PasswordInput name="repeatedPassword" label={props.t.confirmPassword} placeholder={props.t.passwordPlaceholder} />

            <div>
              <div className={styles.specialDietTitle}>
                {props.t.specialDiet} <span className={styles.inputDescription}>{props.t.specialDietOptional}</span>
              </div>

              <div className={styles.checkboxGroup}>
                <label>
                  <input type="checkbox" name="specialDiet" value="vegan" /> {props.t.specialDietOptions.vegan}
                </label>
                <label>
                  <input type="checkbox" name="specialDiet" value="vegetarian" /> {props.t.specialDietOptions.vegetarian}
                </label>
                <label>
                  <input type="checkbox" name="specialDiet" value="hypertensive" /> {props.t.specialDietOptions.hypertensive}
                </label>
                <label>
                  <input type="checkbox" name="specialDiet" value="celiac" /> {props.t.specialDietOptions.celiac}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button kind="primary" size="large" type="submit">
            {props.t.registerBtn}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
