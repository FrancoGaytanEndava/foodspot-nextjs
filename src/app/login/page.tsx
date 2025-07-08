'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@contexts/LocalizationContext';
import { useAuth } from '@contexts/AuthContext';
import Button from '@components/micro/Button/Button';
import FormLayout from '@components/macro/layout/FormLayout/FormLayout';
import { JSX, useEffect, useRef, useState } from 'react';
import { LoginRequest } from '@models/user';
import styles from './styles.module.scss';
import { getBrowserName } from '@utils/utilities';
import { Translation } from '@localization/index';
import Spinner from '@components/micro/Spinner/Spinner';

export default function Login(): JSX.Element {
  const router = useRouter();
  const lang = useTranslation<Translation['login']>('login');
  const { login, isLoading } = useAuth();
  const [browserName, setBrowserName] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(true);
  const inputPassword = useRef<HTMLInputElement | null>(null);

  const [loginCredentials, setLoginCredentials] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.id]: e.target.value,
    });
  }

  async function handleLogin(e: React.MouseEvent): Promise<void> {
    e.preventDefault();
    await login(loginCredentials.email, loginCredentials.password);
  }

  useEffect(() => {
    setBrowserName(getBrowserName());
  }, []);

  return (
    <FormLayout>
      <div
        className={styles.closeBtn}
        onClick={() => {
          router.push('/');
          router.refresh();
        }}
      ></div>

      <h3 className={styles.title}>{lang.loginTitle}</h3>

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
            }}
          ></div>
        )}
        {browserName !== 'Edge' && !showPassword && (
          <div className={styles.passwordEyeCrossedLine}></div>
        )}
      </section>

      {isLoading ? (
        <Spinner size={26} strokeWidth={4} />
      ) : (
        <Button kind="primary" size="large" type="submit" onClick={handleLogin}>
          {lang.loginBtn}
        </Button>
      )}

      <a href="/recoverkey" className={styles.forgotPassword} id="recoverKey">
        {lang.forgotPassword}
      </a>

      <a href="/register" className={styles.register} id="register">
        <span>{lang.alreadyRegistered} </span>
        <span className={styles.registerHighlighted}>{lang.registerHere}</span>
      </a>
    </FormLayout>
  );
}
