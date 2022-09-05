import { authorized } from './axios';
import {
  CreateUserPayload,
  CreateUserResponse,
  FetchMeResponse,
  GetUsersProps,
  GetUsersResponse,
} from 'shared/types/user';
import { AxiosResponse } from 'axios';

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

export const deleteUser = (userId: string): Promise<AxiosResponse<void>> =>
  authorized((api) => api.delete(`user/${userId}`));
