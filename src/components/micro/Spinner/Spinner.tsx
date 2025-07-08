import React from 'react';
import styles from './styles.module.scss';

interface SpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  speed?: string;
}

export default function Spinner({
  size = 32,
  color = '#ffffff',
  strokeWidth = 4,
  speed = '0.8s',
}: SpinnerProps) {
  return (
    <svg
      className={styles.spinner}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      style={{ animationDuration: speed }}
      aria-label="Loading spinner"
    >
      <circle
        className={styles.path}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
