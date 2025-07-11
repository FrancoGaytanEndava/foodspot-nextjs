import styles from './styles.module.scss';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
}

export function EmailInput(props: EmailInputProps) {
  return (
    <>
      <label htmlFor="email" className={styles.loginLabel}>
        {props.label}
      </label>
      <input
        id="email"
        className={`${styles.loginInput} ${props.className ?? ''}`}
        placeholder={props.placeholder}
        type="text"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        aria-label="Email"
      />
    </>
  );
}
