import { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { getBrowserName } from '@utils/utilities';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
}

export function PasswordInput({ value, onChange, label, placeholder, className }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const browser = getBrowserName();

  return (
    <>
      <label htmlFor="password" className={styles.loginLabel}>
        {label}
      </label>
      <section className={styles.inputPasswordSection}>
        <input
          id="password"
          ref={inputRef}
          className={`${styles.loginInput} ${className ?? ''}`}
          placeholder={placeholder}
          type={browser === 'Edge' ? 'password' : showPassword ? 'password' : 'text'}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label="Password"
        />
        {browser !== 'Edge' && (
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
        {browser !== 'Edge' && !showPassword && <div className={styles.passwordEyeCrossedLine}></div>}
      </section>
    </>
  );
}
