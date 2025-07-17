import { ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function TextInput(props: TextInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{props.label}</label>
      <input
        type="text"
        className={`${styles.input} ${props.className ?? ''}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
}
