import { AxiosResponse } from 'axios';

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: Role;
}

export interface User extends Person {
  email: string;
  active: boolean;
  // admin?: boolean;
  createdAt: string;
}

export enum Role {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}

export interface UserDto {
  id: string;
  created_at: string;
  is_active: boolean;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
}

export type FetchMeResponse = AxiosResponse<UserDto>;
