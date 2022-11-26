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
  subjectClass: Class;
  teacher: User;
}

export interface SimpleSubject {
  id: string;
  name: string;
  category: SubjectCategory;
  subjectClass: SubjectClass;
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
  group: ClassDto;
  teacher: UserDto;
}

export interface SimpleSubjectDto {
  id: string;
  subject: SubjectCategory;
  group: SubjectClass;
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

export type GetSubjectsResponse = AxiosResponse<SimpleSubjectDto[]>;
export type GetFullSubjectsResponse = AxiosResponse<SubjectDto[]>;
export type GetSubjectResponse = AxiosResponse<SimpleSubjectDto>;
export type GetFullSubjectResponse = AxiosResponse<SubjectDto>;
export type CreateSubjectResponse = AxiosResponse<SimpleSubjectDto>;
export type UpdateSubjectResponse = AxiosResponse<SimpleSubjectDto>;
