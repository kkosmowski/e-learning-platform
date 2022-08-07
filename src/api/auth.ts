import { authorized, unauthorized } from './axios';
import { AuthenticateResponse, LoginCredentials } from 'shared/types/auth';
import { FetchMeResponse } from 'shared/types/user';

export const authenticate = ({
  username,
  password,
}: LoginCredentials): Promise<AuthenticateResponse> => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return unauthorized((api) => api.post('auth/login', formData));
};

export const fetchMe = (): Promise<FetchMeResponse> => {
  return authorized((api) => api.get('auth/me'));
};
