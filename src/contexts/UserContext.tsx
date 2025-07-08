'use client';

import { createContext, useContext, useState } from 'react';
import { IUser } from '@models/user';

interface IUserContext {
  users: IUser[];
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [users] = useState<IUser[]>([]);

  return <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>;
}

export function useUser(): IUserContext {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
