import { JSX, PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import LinkCustom from '@components/micro/LinkCustom';
import AlertPopup from '@components/micro/AlertPopup';

interface FormLayoutProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormLayout(props: PropsWithChildren<FormLayoutProps>): JSX.Element {
  return (
    <div className={styles.formLayout}>
      <AlertPopup />
      <form onSubmit={e => props.onSubmit?.(e)}>
        <div className={styles.containerLayout}>
          <LinkCustom href="/" className={styles.closeBtn} aria-label="Close"></LinkCustom>
          {props.children}
        </div>
      </form>
    </div>
  );
}
