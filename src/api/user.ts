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
import { USER_PAGE_SIZE } from 'shared/consts/user';

export const createUser = (
  data: CreateUserPayload
): Promise<CreateUserResponse> => {
  return authorized((api) => api.post('user/create', data));
};

export const fetchMe = (): Promise<FetchMeResponse> => {
  return authorized((api) => api.get('user/me'));
};

export const getUsers = (
  props: GetUsersProps,
  offset: number
): Promise<GetUsersResponse> => {
  let roleParam = '';
  let groupParam = '';
  let paginationParams = '';

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

  paginationParams = roleParam || groupParam ? '&' : '?';
  paginationParams += `limit=${USER_PAGE_SIZE}&offset=${offset}`;

  return authorized((api) =>
    api.get(`user${roleParam}${groupParam}${paginationParams}`)
  );
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
