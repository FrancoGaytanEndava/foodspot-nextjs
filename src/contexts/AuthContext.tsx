'use client';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, SetStateAction, useEffect, JSX } from 'react';
import { localStorageKeys } from '.././utils/localStorageKeys';
import { LoginResponse } from '../models/user';
import { _login } from '../services';
import { useAlert } from './AlertContext';
import { AlertTypes } from '../components/micro/AlertPopup';
import { useTranslation } from './LocalizationContext';

interface IAuthContext {
  user: LoginResponse | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  getUserFromLocalStorage: () => LoginResponse | null;
  isAuthenticated: () => boolean;
  isRedirecting: string | null;
  setRedirection: (currentDirection: string | null) => void;
  setUser: React.Dispatch<SetStateAction<LoginResponse | null>>;
  logout: () => void;
  login: (email: string, password: string) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);
  const { setAlert } = useAlert();
  const lang = useTranslation('login');

  /**
   * Logs in user
   */
  function login(email: string, password: string): void {
    setIsLoading(true);

    _login({ email, password })
      .then(res => {
        localStorage.setItem(localStorageKeys.user, JSON.stringify(res));
        localStorage.setItem(localStorageKeys.token, JSON.stringify(res.jwt));
        setUser(res);
        setAlert(`${lang.welcomeMessage} ${res.name}!`, AlertTypes.SUCCESS);

        if (isRedirecting) {
          router.push(`${isRedirecting}`);
          setIsRedirecting(null);
        } else {
          router.push('/');
        }
        router.refresh();
      })
      .catch(error => {
        console.error(error);
        setAlert(lang.loginErrorMessage, AlertTypes.ERROR);
      })
      .finally(() => setIsLoading(false));
  }

  /**
   * Logs out current user
   */
  function logout() {
    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.token);
    setUser(null);
    router.push('/login');
  }

  function getUserFromLocalStorage(): LoginResponse {
    return JSON.parse(localStorage.getItem(localStorageKeys.user) ?? '{}');
  }

  /**
   * Checks if user is auth
   */
  function isAuthenticated(): boolean {
    return !!getUserFromLocalStorage();
  }

  function setRedirection(currentDirection: string | null) {
    if (isRedirecting !== null) {
      setIsRedirecting(null);
    } else {
      setIsRedirecting(currentDirection as string);
    }
  }

  /**
   * Looks for a logged user when app initialize
   */
  useEffect(() => {
    if (!user) {
      setUser(getUserFromLocalStorage());
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isRedirecting,
        setRedirection,
        getUserFromLocalStorage,
        setIsLoading,
        isAuthenticated,
        setUser,
        logout,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (Object.entries(context).length === 0) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
