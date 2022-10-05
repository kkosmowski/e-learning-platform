import { AxiosResponse } from 'axios';
import { Class, ClassDto, SubjectClass } from './class';
import { User, UserDto } from './user';

export interface SubjectCategory {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  category: SubjectCategory;
  subjectClass: SubjectClass;
  teacher: User;
}

export interface FullSubject {
  id: string;
  name: string;
  category: SubjectCategory;
  subjectClass: Class;
  teacher: User;
}

export interface SubjectForm {
  category: SubjectCategory | null;
  subjectClass: SubjectClass | null;
  teacher: User | null;
}

export interface SubjectToUpdate {
  id: string;
  teacher: User;
}

export interface SubjectDto {
  id: string;
  subject: SubjectCategory;
  group: SubjectClass;
  teacher: UserDto;
}

export interface FullSubjectDto {
  id: string;
  subject: SubjectCategory;
  group: ClassDto;
  teacher: UserDto;
}

// payloads

export interface CreateSubjectPayload {
  subject_id: string;
  group_id: string;
  teacher_id: string;
}

export interface UpdateSubjectPayload {
  id: string;
  teacher_id: string;
}

// responses

export type GetSubjectCategoriesResponse = AxiosResponse<SubjectCategory[]>;
export type CreateSubjectCategoryResponse = AxiosResponse<SubjectCategory>;
export type UpdateSubjectCategoryResponse = AxiosResponse<SubjectCategory>;

export type GetSubjectsResponse = AxiosResponse<SubjectDto[]>;
export type GetSubjectResponse = AxiosResponse<FullSubjectDto>;
export type CreateSubjectResponse = AxiosResponse<SubjectDto>;
export type UpdateSubjectResponse = AxiosResponse<SubjectDto>;
