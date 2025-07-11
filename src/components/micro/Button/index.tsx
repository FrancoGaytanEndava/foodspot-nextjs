import { PropsWithChildren, ButtonHTMLAttributes, JSX } from 'react';
import styles from './styles.module.scss';
import { className } from '../../../utils/className';

export type TSize = 'micro' | 'small' | 'short' | 'medium' | 'large' | 'full'; //trata de importarlo bien despoues, desde size

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'primary' | 'secondary' | 'tertiary' | 'validation' | 'whitePrimary' | 'whiteSecondary';
  size?: TSize;
}

export default function Button(props: PropsWithChildren<IButtonProps>): JSX.Element {
  const baseClasses = [styles.button, styles[`size-${props.size ?? 'auto'}`]];

  const conditionalClasses = {
    [styles.primary]: props.kind === 'primary',
    [styles.secondary]: props.kind === 'secondary',
    [styles.tertiary]: props.kind === 'tertiary',
    [styles.validation]: props.kind === 'validation',
    [styles.whitePrimary]: props.kind === 'whitePrimary',
    [styles.whiteSecondary]: props.kind === 'whiteSecondary',
    [props.className ?? '']: !!props.className,
  };

  return (
    <button onClick={props.onClick} {...className(baseClasses, conditionalClasses)} style={{ ...props.style }} id={props.id}>
      {props.children}
    </button>
  );
}
