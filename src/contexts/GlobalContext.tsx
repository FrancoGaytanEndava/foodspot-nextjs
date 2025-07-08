'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, JSX } from 'react';

interface IGlobalContext {
  isSomethingLoading: boolean;
  setIsSomethingLoading: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);

export function GlobalProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [isSomethingLoading, setIsSomethingLoading] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ isSomethingLoading, setIsSomethingLoading }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal(): IGlobalContext {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }

  return context;
}
