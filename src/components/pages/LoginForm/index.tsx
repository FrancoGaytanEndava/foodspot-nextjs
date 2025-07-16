'use client';
import FormLayout from '@components/macro/layout/FormLayout';
import { loginAction } from 'app/[lang]/login/actions';
import LoginFields from './LoginFields';
import { useFormState } from 'react-dom';
import styles from './styles.module.scss';

interface LoginFormProps {
  t: Record<string, any>;
}

export default function LoginForm(props: LoginFormProps) {
  const [formState, formAction] = useFormState(loginAction, { error: undefined });

  return (
    <form action={formAction}>
      <FormLayout>
        <h3 className={styles.title}>{props.t.loginTitle}</h3>
        {formState?.error && <p style={{ color: 'red', marginBottom: '1rem' }}>{formState.error}</p>}
        <LoginFields t={props.t} />
      </FormLayout>
    </form>
  );
}
