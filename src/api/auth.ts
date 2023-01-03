import { authorized, unauthorized } from 'api/axios';
import { AuthenticateResponse, LoginCredentials } from 'shared/types/auth';
import { EmptyResponse } from 'shared/types/shared';

export const authenticate = ({
  username,
  password,
}: LoginCredentials): Promise<AuthenticateResponse> => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return unauthorized((api) => api.post('auth/login', formData));
};

export const resetPassword = (username: string): Promise<EmptyResponse> => {
  return unauthorized((api) => api.post('auth/reset', { username }));
};

export const setPassword = (
  newPassword: string,
  authTokenId: string
): Promise<EmptyResponse> => {
  return unauthorized((api) =>
    api.put('auth/change', {
      auth_token_id: authTokenId,
      new_password: newPassword,
    })
  );
};

export const refreshToken = () =>
  authorized((api) => api.get('auth/refresh-token'));
