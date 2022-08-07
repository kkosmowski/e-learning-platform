import { authorized, unauthorized } from './axios';
import {
  AuthenticateResponse,
  FetchMeResponse,
  LoginCredentials,
} from 'shared/types/auth';

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
