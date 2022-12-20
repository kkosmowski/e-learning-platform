import { AxiosResponse } from 'axios';

import { User, UserDto } from 'shared/types/user';
import { Paginated } from './shared';

export interface SimpleClass {
  id: string;
  name: string;
  // teacher: User;
  studentsCount: number;
}

export interface SimpleClassDto extends Omit<SimpleClass, 'studentsCount'> {
  students_count: number;
  teacher: UserDto;
}

export interface ClassDto {
  id: string;
  name: string;
  teacher: UserDto;
  students: UserDto[];
}

export interface Class {
  id: string;
  name: string;
  teacher: User;
  students: User[];
}

export interface SubjectClass {
  id: string;
  name: string;
}

export interface ClassForm {
  name: string;
  teacher: User | null;
  students: User[];
}

// payloads

export interface CreateClassPayload {
  name: string;
  teacher_id: string;
  student_ids: string[];
}

export interface UpdateClassPayload extends CreateClassPayload {
  id: string;
}

// responses

export type CreateClassResponse = AxiosResponse<SimpleClassDto>;
export type GetClassesResponse = AxiosResponse<Paginated<SimpleClassDto>>;
export type ValidateClassNameResponse = AxiosResponse<boolean>;
export type GetClassResponse = AxiosResponse<ClassDto>;
export type UpdateClassResponse = AxiosResponse<ClassDto>;
