import styles from './styles.module.scss';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
  darkInput?: boolean;
}

export function EmailInput(props: EmailInputProps) {
  return (
    <>
      <label htmlFor="email" className={`${styles.loginLabel} ${props.darkInput ? styles.darkLabel : ''}`}>
        {props.label}
      </label>
      <input
        id="email"
        className={`${styles.loginInput}  ${props.darkInput ? styles.darkInput : ''} ${props.className ?? ''}`}
        placeholder={props.placeholder}
        type="email"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        aria-label="Email"
      />
    </>
  );
}
