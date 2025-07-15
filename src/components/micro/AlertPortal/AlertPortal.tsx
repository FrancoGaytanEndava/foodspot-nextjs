'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { subscribeToAlerts } from '@utils/alertService';
import styles from './styles.module.scss';

export enum AlertTypes {
  ERROR = 1,
  SUCCESS = 2,
  INFO = 3,
  WARNING = 4,
}

export default function AlertPortal() {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState('');
  const [type, setType] = useState<AlertTypes | null>(null);

  useEffect(() => {
    setMounted(true);

    subscribeToAlerts(({ text, type }) => {
      setText(text);
      setType(type);
      setTimeout(() => {
        setText('');
        setType(null);
      }, 3000);
    });
  }, []);

  if (!mounted || !text || !type) return null;

  let popupStyle = '';
  let iconName = '';

  switch (type) {
    case AlertTypes.ERROR:
      popupStyle = styles.error;
      iconName = 'error';
      break;
    case AlertTypes.SUCCESS:
      popupStyle = styles.success;
      iconName = 'check_circle';
      break;
    case AlertTypes.INFO:
      popupStyle = styles.info;
      iconName = 'info';
      break;
    case AlertTypes.WARNING:
      popupStyle = styles.warning;
      iconName = 'warning';
      break;
    default:
      break;
  }

  return createPortal(
    <div className={`${styles.messageContainer} ${popupStyle}`}>
      <i className={`${styles.messageIcon} material-icons`}>{iconName}</i>
      <span className={styles.message}>{text}</span>
    </div>,
    document.getElementById('alert-root')!
  );
}
