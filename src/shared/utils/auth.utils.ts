import { AccessTokenData } from 'shared/types/auth';

export const setLocalAuthSession = (tokenData: AccessTokenData): void => {
  localStorage.setItem('auth', JSON.stringify(tokenData));
};

export const clearLocalAuthSession = (): void => {
  localStorage.removeItem('auth');
};

export const getLocalAuthSession = (): AccessTokenData | null => {
  const data = localStorage.getItem('auth');
  return data ? JSON.parse(data) : null;
};

export const isSessionExpired = (expiresAt: string): boolean =>
  new Date().getTime() > new Date(expiresAt).getTime();
