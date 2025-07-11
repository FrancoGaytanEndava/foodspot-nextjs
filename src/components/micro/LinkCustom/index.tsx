'use client';

import Link, { LinkProps } from 'next/link';
import { useLocalizationContext } from '@contexts/LocalizationContext';
import { PropsWithChildren } from 'react';

interface LinkCustomProps extends LinkProps {
  className?: string;
  id?: string;
}

export default function LinkCustom({ href, className, children, ...rest }: PropsWithChildren<LinkCustomProps>) {
  const { locale } = useLocalizationContext();

  const langPrefix = `/${locale.id}`;
  const resolvedHref = `${langPrefix}${typeof href === 'string' ? href : href.pathname}`.replace(/\/{2,}/g, '/');

  return (
    <Link href={resolvedHref} className={className} {...rest}>
      {children}
    </Link>
  );
}
