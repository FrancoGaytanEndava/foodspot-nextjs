'use client';

import { useAlert } from '@contexts/AlertContext';
import styles from './styles.module.scss';

export enum AlertTypes {
  ERROR = 1,
  SUCCESS = 2,
  INFO = 3,
  WARNING = 4,
}

export default function AlertPopup() {
  const { text, type } = useAlert();

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
      iconName = '';
      break;
  }

  if (text && type) {
    return (
      <div className={`${styles.messageContainer} ${popupStyle}`}>
        <i className={`${styles.messageIcon} material-icons`}>{iconName}</i>
        <span className={styles.message}>{text}</span>
      </div>
    );
  }

  return null;
}
