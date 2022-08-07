import { AxiosResponse } from 'axios';
import { UserDto } from './user';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AccessTokenData {
  token: string;
  expires_at: string;
}

export interface AuthenticationData {
  user: UserDto;
  access_token: AccessTokenData;
}

// responses

export type AuthenticateResponse = AxiosResponse<AuthenticationData>;
