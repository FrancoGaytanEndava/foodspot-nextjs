import styles from './styles.module.scss';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
}

export function EmailInput({ value, onChange, label, placeholder, className }: EmailInputProps) {
  return (
    <>
      <label htmlFor="email" className={styles.loginLabel}>
        {label}
      </label>
      <input
        id="email"
        className={`${styles.loginInput} ${className ?? ''}`}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Email"
      />
    </>
  );
}
