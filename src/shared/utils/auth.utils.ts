import { AccessTokenData } from 'shared/types/auth';

export const setLocalAuthSession = (tokenData: string): void => {
  localStorage.setItem('auth', JSON.stringify(tokenData));
};

export const clearLocalAuthSession = (): void => {
  localStorage.removeItem('auth');
};

export const getLocalAuthSession = (): string | null => {
  const data = localStorage.getItem('auth');
  return data ? JSON.parse(data) : null;
};

export const isSessionExpired = (expiresAt: string): boolean =>
  new Date().getTime() > new Date(expiresAt).getTime();
