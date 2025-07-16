'use client';

import { useAuth } from '@contexts/AuthContext';
import Button from '@components/micro/Button';
import FormLayout from '@components/macro/layout/FormLayout';
import styles from './styles.module.scss';
import Spinner from '@components/micro/Spinner';
import LinkCustom from '@components/micro/LinkCustom';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import { useLoginFormState } from '@hooks/useLoginFormState';
import { useTranslation } from '@hooks/useLocalization';

export default function LoginForm() {
  const { t } = useTranslation('login');
  const { login, isLoading } = useAuth();
  const { credentials, setEmail, setPassword } = useLoginFormState();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    await login(credentials.email, credentials.password);
  };

  return (
    <FormLayout>
      <h3 className={styles.title}> {t.loginTitle}</h3>

      <EmailInput value={credentials.email} onChange={setEmail} label={t.email} placeholder={t.user} />
      <PasswordInput value={credentials.password} onChange={setPassword} label={t.password} placeholder={t.password} />

      {isLoading ? (
        <Spinner size={26} strokeWidth={4} />
      ) : (
        <Button kind="primary" size="large" type="submit" onClick={handleLogin}>
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
    </FormLayout>
  );
}
