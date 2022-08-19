import { unauthorized } from 'api/axios';
import { AuthenticateResponse, LoginCredentials } from 'shared/types/auth';

export const authenticate = ({
  username,
  password,
}: LoginCredentials): Promise<AuthenticateResponse> => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return unauthorized((api) => api.post('auth/login', formData));
};
