import { AxiosResponse } from 'axios';
import { User } from './user';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AccessTokenData {
  token: string;
  expires_at: string;
}

export interface AuthenticationData {
  user: User;
  access_token: string;
}

// responses

export type AuthenticateResponse = AxiosResponse<AuthenticationData>;
export type FetchMeResponse = AxiosResponse<User>;
