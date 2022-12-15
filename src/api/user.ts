import { authorized } from './axios';
import {
  CreateUserPayload,
  CreateUserResponse,
  FetchMeResponse,
  GetUsersProps,
  GetUsersResponse,
  GetUserResponse,
  UpdateUserPayload,
  GetUserWithDetailsResponse,
} from 'shared/types/user';
import { EmptyResponse } from 'shared/types/shared';

export const createUser = (
  data: CreateUserPayload
): Promise<CreateUserResponse> => {
  return authorized((api) => api.post('user/create', data));
};

export const fetchMe = (): Promise<FetchMeResponse> => {
  return authorized((api) => api.get('user/me'));
};

export const getUsers = (props: GetUsersProps): Promise<GetUsersResponse> => {
  let roleParam = '';
  let groupParam = '';

  if (props.role) {
    if (props.role instanceof Array) {
      roleParam = '?role=' + props.role.join('&role=');
    } else {
      roleParam = '?role=' + props.role;
    }
  }
  if (props.withoutGroups) {
    groupParam = roleParam ? '&' : '?';
    groupParam += 'without_group=true';
  } else if (props.group !== undefined) {
    groupParam = roleParam ? '&' : '?';
    groupParam += 'group=' + props.group;
  }

  return authorized((api) => api.get(`user${roleParam}${groupParam}`));
};

export const getUser = (userId: string): Promise<GetUserResponse> =>
  authorized((api) => api.get(`user/${userId}`));

export const getUserWithDetails = (
  userId: string
): Promise<GetUserWithDetailsResponse> =>
  authorized((api) => api.get(`user/admin/${userId}`));

export const updateUser = (
  payload: UpdateUserPayload
): Promise<GetUserResponse> =>
  authorized((api) => api.patch(`user/${payload.id}`, payload));

export const deleteUser = (userId: string): Promise<EmptyResponse> =>
  authorized((api) => api.delete(`user/${userId}`));
