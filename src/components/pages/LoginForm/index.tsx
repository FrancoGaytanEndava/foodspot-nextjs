'use client';

import { useTranslation } from '@contexts/LocalizationContext';
import { useAuth } from '@contexts/AuthContext';
import Button from '@components/micro/Button';
import FormLayout from '@components/macro/layout/FormLayout';
import styles from './styles.module.scss';
import Spinner from '@components/micro/Spinner';
import LinkCustom from '@components/micro/LinkCustom';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import { useLoginFormState } from '@hooks/useLoginFormState';

export default function LoginForm() {
  const lang = useTranslation('login');
  const { login, isLoading } = useAuth();
  const { credentials, setEmail, setPassword } = useLoginFormState();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    await login(credentials.email, credentials.password);
  };

  return (
    <FormLayout>
      <h3 className={styles.title}> {lang.loginTitle}</h3>

      <EmailInput value={credentials.email} onChange={setEmail} label={lang.email} placeholder={lang.user} />
      <PasswordInput value={credentials.password} onChange={setPassword} label={lang.password} placeholder={lang.password} />

      {isLoading ? (
        <Spinner size={26} strokeWidth={4} />
      ) : (
        <Button kind="primary" size="large" type="submit" onClick={handleLogin}>
          {lang.loginBtn}
        </Button>
      )}

      <LinkCustom href="/recoverkey" className={styles.forgotPassword}>
        {lang.forgotPassword}
      </LinkCustom>

      <LinkCustom href="/register" className={styles.register} id="register">
        <span>{lang.alreadyRegistered} </span>
        <span className={styles.registerHighlighted}>{lang.registerHere}</span>
      </LinkCustom>
    </FormLayout>
  );
}
