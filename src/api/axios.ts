import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { API_URL } from 'config';

type RequestCallback<T extends AxiosResponse> = (
  api: AxiosInstance
) => Promise<T>;

export const api = axios.create({ baseURL: API_URL });

export const setToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = (): void => {
  delete api.defaults.headers.common.Authorization;
};

export const unauthorized = <T extends AxiosResponse>(
  callback: RequestCallback<T>
) => callback(api);
export const authorized = <T extends AxiosResponse>(
  callback: RequestCallback<T>
) => {
  if (!api.defaults.headers.common.Authorization) {
    console.error('Error: No token provided for authorized request call');
  }

  // const authSession = getLocalAuthSession();
  //
  // if (!authSession) {
  //   logout();
  //   return Promise.reject();
  // }
  //
  // const { expiresAt } = authSession;
  //
  // if (isSessionExpired(expiresAt)) {
  //   await refreshToken();
  // }

  return callback(api);
};
