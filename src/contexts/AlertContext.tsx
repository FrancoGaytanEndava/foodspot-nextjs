'use client';

import { createContext, useContext, useState } from 'react';
import { AlertTypes } from '@components/micro/AlertPopup';

const ALERT_TIME = 3000;

interface IAlertContext {
  text: string;
  type: AlertTypes | null;
  setAlert: (text: string, type: AlertTypes) => void;
}

const initialState: IAlertContext = {
  text: '',
  type: null,
  setAlert: () => {},
};

const AlertContext = createContext<IAlertContext>(initialState);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('');
  const [type, setType] = useState<AlertTypes | null>(null);

  const setAlert = (text: string, type: AlertTypes) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText('');
      setType(null);
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert(): IAlertContext {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  return context;
}
