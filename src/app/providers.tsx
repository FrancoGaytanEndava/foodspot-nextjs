'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@contexts/AuthContext';
import { AlertProvider } from '@contexts/AlertContext';
import { LocalizationProvider } from '@contexts/LocalizationContext';
import { EventProvider } from '@contexts/EventContext';
import { GlobalProvider } from '@contexts/GlobalContext';
import { UserProvider } from '@contexts/UserContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AlertProvider>
        <LocalizationProvider>
          <GlobalProvider>
            <EventProvider>
              <UserProvider>{children}</UserProvider>
            </EventProvider>
          </GlobalProvider>
        </LocalizationProvider>
      </AlertProvider>
    </AuthProvider>
  );
}
