import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { authenticate, fetchMe } from 'api/auth';
import { clearToken, setToken } from 'api/axios';
import { LoginCredentials } from 'shared/types/auth';
import { User, UserDto } from 'shared/types/user';
import {
  clearLocalAuthSession,
  getLocalAuthSession,
  isSessionExpired,
  setLocalAuthSession,
} from 'shared/utils/auth.utils';
import { mapUserDtoToUser } from 'shared/utils/user.utils';
import { getErrorDetail } from 'shared/utils/common.utils';
import { sessionExpiredError } from 'shared/consts/error';

interface AuthContextState {
  currentUser: User | null;
  error: string;
  signIn: (credentials: LoginCredentials) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextState>({
  currentUser: null,
  error: '',
  signIn: () => {},
  signOut: () => {},
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

  const signIn = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const { data } = await authenticate(credentials);

      if (data.user && data.access_token) {
        setUser(data.user);
        setLocalAuthSession(data.access_token);
        setToken(data.access_token.token);
      }
    } catch (err: unknown) {
      console.log(err);
      setError(getErrorDetail(err));
    }
  };

  const setUser = (userDto: UserDto): void => {
    setCurrentUser(mapUserDtoToUser(userDto));
  };

  const signOut = () => {
    clearLocalAuthSession();
    clearToken();
    setCurrentUser(null);
  };

  const fetchCurrentUser = useCallback(async (token: string): Promise<void> => {
    setToken(token);

    try {
      const { data: userDto } = await fetchMe();
      setUser(userDto);
    } catch (err: unknown) {
      setError(getErrorDetail(err));
    }
  }, []);

  useEffect(() => {
    const localAuthSession = getLocalAuthSession();

    if (localAuthSession) {
      if (!isSessionExpired(localAuthSession.expires_at)) {
        void fetchCurrentUser(localAuthSession.token);
      } else {
        setError(sessionExpiredError);
        clearLocalAuthSession();
      }
    }
  }, [fetchCurrentUser]);

  const value: AuthContextState = {
    currentUser,
    error,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
