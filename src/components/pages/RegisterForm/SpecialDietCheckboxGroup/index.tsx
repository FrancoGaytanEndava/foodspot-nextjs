'use client';

import styles from './styles.module.scss';
import { SpecialDietOptions } from '@hooks/useRegisterFormState';

interface SpecialDietCheckboxGroupProps {
  values: SpecialDietOptions;
  labels: Record<keyof SpecialDietOptions, string>;
  title: string;
  description?: string;
  onChange: (params: { key: keyof SpecialDietOptions; checked: boolean }) => void;
}

export default function SpecialDietCheckboxGroup(props: SpecialDietCheckboxGroupProps) {
  return (
    <div className={styles.container}>
      <label className={styles.title}>{props.title}</label>
      {props.description && <span className={styles.description}>{props.description}</span>}

      <div className={styles.checkboxGroup}>
        {Object.entries(props.labels).map(([key, label]) => (
          <label key={key} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={props.values[key]}
              onChange={e =>
                props.onChange({
                  key: key as keyof typeof props.values,
                  checked: e.target.checked,
                })
              }
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
