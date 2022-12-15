import { AxiosResponse } from 'axios';
import { SimpleClass, SimpleClassDto } from './class';
import { SimpleSubject, SimpleSubjectDto } from './subject';

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

export interface UserWithDetails extends User {
  subjectClass?: SimpleClass;
  subjects?: SimpleSubject[];
}

export interface SimpleUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export enum Role {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}

export interface SimpleUserDto {
  id: string;
  first_name: string;
  last_name: string;
}

export interface UserDto extends SimpleUserDto {
  created_at: string;
  is_active: boolean;
  email: string;
  role: Role;
}

export interface UserWithDetailsDto extends SimpleUserDto {
  created_at: string;
  is_active: boolean;
  email: string;
  role: Role;
  group?: SimpleClassDto;
  group_subjects?: SimpleSubjectDto[];
}

export type CreateUserForm = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'role'
>;

export type UpdateUserForm = Pick<User, 'email' | 'firstName' | 'lastName'>;

export interface GetUsersProps {
  role?: Role | Role[];
  withoutGroups?: boolean;
  group?: string;
}

// payloads

export type CreateUserPayload = Pick<
  UserDto,
  'email' | 'first_name' | 'last_name' | 'role'
>;
export type UpdateUserPayload = Pick<UserDto, 'id'> &
  Partial<Omit<UserDto, 'id' | 'role'>>;

// responses

export type FetchMeResponse = AxiosResponse<UserDto>;
export type CreateUserResponse = AxiosResponse<UserDto>;
export type GetUsersResponse = AxiosResponse<UserDto[]>;
export type GetUserResponse = AxiosResponse<UserDto>;
export type GetUserWithDetailsResponse = AxiosResponse<UserWithDetailsDto>;
