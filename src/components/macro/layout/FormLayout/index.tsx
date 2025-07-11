import { JSX, PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import router from 'next/router';
import LinkCustom from '@components/micro/LinkCustom';

interface FormLayoutProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormLayout(props: PropsWithChildren<FormLayoutProps>): JSX.Element {
  return (
    <div className={styles.formLayout}>
      <form onSubmit={e => props.onSubmit?.(e)}>
        <div className={styles.containerLayout}>
          <LinkCustom
            href="/"
            className={styles.closeBtn}
            onClick={() => {
              router.push('/');
              router.reload();
            }}
            aria-label="Close"></LinkCustom>
          {props.children}
        </div>
      </form>
    </div>
  );
}
