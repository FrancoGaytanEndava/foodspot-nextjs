import { JSX, PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import LinkCustom from '@components/micro/LinkCustom';

export default function FormLayout(props: PropsWithChildren): JSX.Element {
  return (
    <div className={styles.formLayout}>
      <div className={styles.containerLayout}>
        <LinkCustom href="/" className={styles.closeBtn} aria-label="Close" />
        {props.children}
      </div>
    </div>
  );
}
