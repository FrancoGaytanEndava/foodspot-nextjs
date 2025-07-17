'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { showToast, ToastType } from '@utils/toastService';

interface ToastQueryTriggerProps {
  queryKey: string;
  matchValue: string;
  message: string;
  type?: ToastType;
}

export default function ToastQueryTrigger(props: ToastQueryTriggerProps) {
  const searchParams = useSearchParams();
  const value = searchParams.get(props.queryKey);

  useEffect(() => {
    if (value === props.matchValue) {
      showToast(props.message, props.type);
    }
  }, [value, props.message, props.type]);

  return null;
}
