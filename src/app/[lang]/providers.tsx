'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@contexts/AuthContext';
import { AlertProvider } from '@contexts/AlertContext';
import { LocalizationProvider } from '@contexts/LocalizationContext';
import { EventProvider } from '@contexts/EventContext';
import { GlobalProvider } from '@contexts/GlobalContext';
import { UserProvider } from '@contexts/UserContext';

interface ProvidersProps {
  children: ReactNode;
  lang?: string;
}

export function Providers(props: ProvidersProps) {
  return (
    <AuthProvider>
      <AlertProvider>
        <LocalizationProvider lang={props.lang}>
          <GlobalProvider>
            <EventProvider>
              <UserProvider>{props.children}</UserProvider>
            </EventProvider>
          </GlobalProvider>
        </LocalizationProvider>
      </AlertProvider>
    </AuthProvider>
  );
}
