'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@contexts/LocalizationContext';
import { useAuth } from '@contexts/AuthContext';
import Button from '@components/micro/Button';
import FormLayout from '@components/macro/layout/FormLayout';
import { useEffect, useRef, useState } from 'react';
import { LoginRequest } from '@models/user';
import styles from './styles.module.scss';
import { getBrowserName } from '@utils/utilities';
import Spinner from '@components/micro/Spinner';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const lang = useTranslation('login');
  const { login, isLoading } = useAuth();

  const [browserName, setBrowserName] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(true);
  const inputPassword = useRef<HTMLInputElement | null>(null);

  const [loginCredentials, setLoginCredentials] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  useEffect(() => {
    setBrowserName(getBrowserName());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    await login(loginCredentials.email, loginCredentials.password);
  };

  return (
    <FormLayout>
      <div
        className={styles.closeBtn}
        onClick={() => {
          router.push('/');
          router.refresh();
        }}
        aria-label="Close"
        role="button"></div>

      <h3 className={styles.title}> {lang.loginTitle}</h3>

      <label htmlFor="email" className={styles.loginLabel}>
        {lang.email}
      </label>

      <input
        id="email"
        className={styles.loginInput}
        placeholder={lang.user}
        type="text"
        onChange={handleChange}
        value={loginCredentials.email}
        aria-label="Email"
      />

      <label htmlFor="password" className={styles.loginLabel}>
        {lang.password}
      </label>

      <section className={styles.inputPasswordSection}>
        <input
          id="password"
          ref={inputPassword}
          className={styles.loginInput}
          placeholder={lang.password}
          type={browserName === 'Edge' ? 'password' : showPassword ? 'password' : 'text'}
          onChange={handleChange}
          value={loginCredentials.password}
          aria-label="Password"
        />

        {browserName !== 'Edge' && (
          <div
            className={styles.passwordEye}
            onClick={() => {
              setShowPassword(!showPassword);
              setTimeout(() => {
                if (inputPassword.current) {
                  inputPassword.current.focus();
                  const length = inputPassword.current.value.length;
                  inputPassword.current.setSelectionRange(length, length);
                }
              }, 0);
            }}></div>
        )}

        {browserName !== 'Edge' && !showPassword && <div className={styles.passwordEyeCrossedLine}></div>}
      </section>

      {isLoading ? (
        <Spinner size={26} strokeWidth={4} />
      ) : (
        <Button kind="primary" size="large" type="submit" onClick={handleLogin}>
          {lang.loginBtn}
        </Button>
      )}

      <Link href="/recoverkey" className={styles.forgotPassword}>
        {lang.forgotPassword}
      </Link>

      <Link href="/register" className={styles.register} id="register">
        <span>{lang.alreadyRegistered} </span>
        <span className={styles.registerHighlighted}>{lang.registerHere}</span>
      </Link>
    </FormLayout>
  );
}
