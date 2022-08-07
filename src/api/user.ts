import { authorized } from './axios';
import { CreateUserPayload, CreateUserResponse } from 'shared/types/user';

export const createUser = (
  data: CreateUserPayload
): Promise<CreateUserResponse> => {
  return authorized((api) => api.post('auth/create', data));
};
