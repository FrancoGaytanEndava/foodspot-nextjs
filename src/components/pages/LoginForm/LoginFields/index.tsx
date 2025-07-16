'use client';

import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import Button from '@components/micro/Button';
import Spinner from '@components/micro/Spinner';
import LinkCustom from '@components/micro/LinkCustom';
import styles from './styles.module.scss';
import { useFormStatus } from 'react-dom';

interface LoginFieldsProps {
  t: Record<string, string>;
}

export default function LoginFields(props: LoginFieldsProps) {
  const { pending } = useFormStatus();
  const t = props.t;

  return (
    <>
      <EmailInput name="email" label={t.email} placeholder={t.user} />
      <PasswordInput name="password" label={t.password} placeholder={t.password} />

      {pending ? (
        <Spinner size={26} strokeWidth={4} />
      ) : (
        <Button kind="primary" size="large" type="submit">
          {t.loginBtn}
        </Button>
      )}

      <LinkCustom href="/recoverKey" className={styles.forgotPassword}>
        {t.forgotPassword}
      </LinkCustom>

      <LinkCustom href="/register" className={styles.register} id="register">
        <span>{t.alreadyRegistered} </span>
        <span className={styles.registerHighlighted}>{t.registerHere}</span>
      </LinkCustom>
    </>
  );
}
