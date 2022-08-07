import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AxiosError } from 'axios';

import { authenticate, fetchMe } from 'api/auth';
import { setToken } from 'api/axios';
import { LoginCredentials } from 'shared/types/auth';
import { User } from 'shared/types/user';
import { ErrorData } from 'shared/types/shared';
import {
  clearLocalAuthSession,
  getLocalAuthSession,
  isSessionExpired,
  setLocalAuthSession,
} from 'shared/utils/auth.utils';

interface AuthContextState {
  currentUser: User | null;
  error: string;
  logIn: (credentials: LoginCredentials) => void;
}

export const AuthContext = createContext<AuthContextState>({
  currentUser: null,
  error: '',
  logIn: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [currentUser, setCurrentUser] =
    useState<AuthContextState['currentUser']>(null);
  const [error, setError] = useState<AuthContextState['error']>('');

  const logIn = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const { data } = await authenticate(credentials);

      if (data.user && data.access_token) {
        setCurrentUser(data.user);
        setLocalAuthSession(data.access_token);
        setToken(data.access_token);
      }
    } catch (err: unknown) {
      const error = err as AxiosError;

      if (error.response?.data) {
        const errorText =
          (error.response.data as ErrorData).detail || 'Unknown error';
        setError(errorText);
      }
    }
  };

  const fetchCurrentUser = async (token: string): Promise<void> => {
    setToken(token);
    try {
      const { data } = await fetchMe();
      setCurrentUser(data);
    } catch (err: unknown) {
      const error = err as AxiosError;

      if (error.response?.data) {
        const errorText =
          (error.response.data as ErrorData).detail || 'Unknown error';
        setError(errorText);
      }
    }
  };

  useEffect(() => {
    const localAuthSession = getLocalAuthSession();

    if (localAuthSession) {
      // if (!isSessionExpired(localAuthSession.expires_at)) {
      void fetchCurrentUser(localAuthSession);
      // } else {
      //   setError('You\'ve been logged out');
      //   clearLocalAuthSession();
      // }
    }
  }, []);

  const value: AuthContextState = {
    currentUser,
    error,
    logIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
