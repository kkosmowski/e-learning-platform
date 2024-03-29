import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  authenticate,
  refreshToken,
  resetPassword,
  setPassword,
} from 'api/auth';
import { fetchMe } from 'api/user';
import { clearToken, setToken } from 'api/axios';
import { AuthenticationData, LoginCredentials } from 'shared/types/auth';
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
import { MINUTE } from 'shared/consts/date';
import useInterceptors from 'hooks/use-interceptors';

interface AuthContextState {
  currentUser: User | null | undefined;
  error: string;
  signIn: (credentials: LoginCredentials) => void;
  signOut: () => void;
  resetPassword: (username: string) => void;
  changePassword: (newPassword: string, authToken: string) => void;
}

export const AuthContext = createContext<AuthContextState>({
  currentUser: undefined,
  error: '',
  signIn: () => {},
  signOut: () => {},
  resetPassword: () => {},
  changePassword: () => {},
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
    useState<AuthContextState['currentUser']>(undefined);
  const [error, setError] = useState<AuthContextState['error']>('');
  const [tokenExpirationTime, setTokenExpirationTime] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const tryToSaveData = useCallback((data: AuthenticationData): void => {
    if (data.user && data.access_token) {
      setUser(data.user);
      setLocalAuthSession(data.access_token);
      setToken(data.access_token.token);
      setTokenExpirationTime(data.access_token.expires_at);
    }
  }, []);

  const signIn = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const { data } = await authenticate(credentials);
      tryToSaveData(data);
    } catch (err: unknown) {
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
    setTokenExpirationTime(null);
    queryClient.clear();
  };

  const handlePasswordReset = async (username: string): Promise<void> => {
    try {
      await resetPassword(username);
      toast.success(t('toast.resetPassword.success'), { duration: 10000 });
      navigate('/auth');
    } catch (error) {
      toast.error(t(getErrorDetail(error)), { duration: 10000 });
    }
  };

  const changePassword = async (
    newPassword: string,
    authToken: string
  ): Promise<void> => {
    try {
      await setPassword(newPassword, authToken);
      toast.success(t('toast.changePassword.success'), { duration: 10000 });
      navigate('/auth');
    } catch (error) {
      toast.error(t(getErrorDetail(error)), { duration: 10000 });
      navigate('/auth');
    }
  };

  useInterceptors(signOut);

  const fetchCurrentUser = useCallback(async (token: string): Promise<void> => {
    setToken(token);

    try {
      const { data: userDto } = await fetchMe();
      setUser(userDto);
    } catch (err: unknown) {
      setError(getErrorDetail(err));
    }
  }, []);

  const requestTokenRefresh = useCallback(async () => {
    const { data } = await refreshToken();
    tryToSaveData(data);
  }, [tryToSaveData]);

  useEffect(() => {
    const localAuthSession = getLocalAuthSession();

    if (localAuthSession) {
      if (!isSessionExpired(localAuthSession.expires_at)) {
        setTokenExpirationTime(localAuthSession.expires_at);
        void fetchCurrentUser(localAuthSession.token);
      } else {
        setError(sessionExpiredError);
        clearLocalAuthSession();
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (tokenExpirationTime) {
      const expirationTimestamp = new Date(tokenExpirationTime).getTime();
      const nowTimestamp = new Date().getTime();
      const delta = expirationTimestamp - nowTimestamp;

      setTimeout(() => {
        void requestTokenRefresh();
      }, delta - MINUTE);
    }
  }, [tokenExpirationTime, requestTokenRefresh]);

  const value: AuthContextState = {
    currentUser,
    error,
    signIn,
    signOut,
    resetPassword: handlePasswordReset,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
