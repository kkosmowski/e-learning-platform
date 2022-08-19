import { authorized } from './axios';
import {
  CreateUserPayload,
  CreateUserResponse,
  FetchMeResponse,
  Role,
  GetUsersResponse,
} from 'shared/types/user';

export const createUser = (
  data: CreateUserPayload
): Promise<CreateUserResponse> => {
  return authorized((api) => api.post('user/create', data));
};

export const fetchMe = (): Promise<FetchMeResponse> => {
  return authorized((api) => api.get('user/me'));
};

export const getUsers = (role?: Role | Role[]): Promise<GetUsersResponse> => {
  let roleParam = '';

  if (role) {
    if (role instanceof Array) {
      roleParam = '?role=' + role.join('&role=');
    } else {
      roleParam = '?role=' + role;
    }
  }

  return authorized((api) => api.get(`user${roleParam}`));
};
