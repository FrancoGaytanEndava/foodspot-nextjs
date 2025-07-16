'use client';
import { useState, useRef, RefObject, useEffect } from 'react';
import styles from './styles.module.scss';
import { getBrowserName } from '@utils/utilities';

interface PasswordInputProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [canRenderEye, setCanRenderEye] = useState(false);

  useEffect(() => {
    const browser = getBrowserName();
    setCanRenderEye(browser !== 'Edge');
  }, []);

  return (
    <>
      <label htmlFor="password" className={styles.loginLabel}>
        {props.label}
      </label>
      <section className={styles.inputPasswordSection}>
        <input
          id="password"
          name={props.name}
          ref={inputRef}
          className={`${styles.loginInput} ${props.className ?? ''}`}
          placeholder={props.placeholder}
          type={!canRenderEye ? 'password' : showPassword ? 'password' : 'text'}
          value={props.value}
          onChange={e => props.onChange?.(e.target.value)}
          aria-label="Password"
        />
        {canRenderEye && (
          <div
            className={styles.passwordEye}
            onClick={() => {
              setShowPassword(!showPassword);
              setTimeout(() => {
                inputRef.current?.focus();
                const length = inputRef.current?.value.length ?? 0;
                inputRef.current?.setSelectionRange(length, length);
              }, 0);
            }}
          />
        )}
        {canRenderEye && !showPassword && <div className={styles.passwordEyeCrossedLine}></div>}
      </section>
    </>
  );
}
