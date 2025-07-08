import { PropsWithChildren, ButtonHTMLAttributes, JSX } from 'react';
import styles from './styles.module.scss';
import { className } from '../../../utils/className';

export type TSize = 'micro' | 'small' | 'short' | 'medium' | 'large' | 'full'; //trata de importarlo bien despoues, desde size

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'primary' | 'secondary' | 'tertiary' | 'validation' | 'whitePrimary' | 'whiteSecondary';
  size?: TSize;
}

export default function Button(props: PropsWithChildren<IButtonProps>): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      {...className(
        styles.button,
        styles[props.kind ?? 'primary'],
        styles[props.kind ?? 'secondary'],
        styles[props.kind ?? 'tertiary'],
        styles[props.kind ?? 'validation'],
        styles[props.kind ?? 'whitePrimary'],
        styles[props.kind ?? 'whiteSecondary'],
        props.className ?? '',
        styles[`size-${props.size ?? 'auto'}`]
      )}
      style={{ ...props.style }}
      id={props.id}
    >
      {props.children}
    </button>
  );
}
