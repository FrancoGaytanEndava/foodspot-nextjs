import FormLayout from '@components/macro/layout/FormLayout';
import Button from '@components/micro/Button';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import styles from './styles.module.scss';
import LinkCustom from '@components/micro/LinkCustom';
import { handleLogin } from 'app/[lang]/login/actions';
import ToastQueryTrigger from '@components/micro/ToastQueryTrigger';
import { ToastType } from '@utils/toastService';

interface LoginFormProps {
  t: Record<string, string>;
  lang: string;
}

export default function LoginForm(props: LoginFormProps) {
  const t = props.t;
  const lang = props.lang;
  return (
    <>
      <ToastQueryTrigger queryKey="error" matchValue="invalid" message={t.loginErrorMessage ?? 'Credenciales inválidas'} type={ToastType.ERROR} />
      <FormLayout>
        <form action={handleLogin}>
          <input type="hidden" name="lang" value={lang} />
          <h3 className={styles.title}>{t.loginTitle}</h3>
          <EmailInput name="email" label={t.email} placeholder={t.user} />
          <PasswordInput name="password" label={t.password} placeholder={t.password} />
          <Button kind="primary" size="large" type="submit">
            {t.loginBtn}
          </Button>{' '}
          <div className={styles.linksContainer}>
            <LinkCustom href="/recoverKey" className={styles.forgotPassword}>
              {t.forgotPassword}
            </LinkCustom>
          </div>
          <div className={styles.linksContainer}>
            <LinkCustom href="/register" className={styles.register} id="register">
              <span>{t.alreadyRegistered} </span>
              <span className={styles.registerHighlighted}>{t.registerHere}</span>
            </LinkCustom>
          </div>
        </form>
      </FormLayout>
    </>
  );
}
