import { AxiosResponse } from 'axios';
import { Classroom, ClassroomDto, SubjectClassroom } from './classroom';
import { User, UserDto } from './user';

export interface SubjectCategory {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  category: SubjectCategory;
  classroom: SubjectClassroom;
  teacher: User;
}

export interface FullSubject {
  id: string;
  name: string;
  category: SubjectCategory;
  classroom: Classroom;
  teacher: User;
}

export interface SubjectForm {
  category: SubjectCategory;
  classroom: SubjectClassroom;
  teacher: User;
}

export interface SubjectDto {
  id: string;
  subject: SubjectCategory;
  group: SubjectClassroom;
  teacher: UserDto;
}

export interface FullSubjectDto {
  id: string;
  subject: SubjectCategory;
  group: ClassroomDto;
  teacher: UserDto;
}

// payloads

export interface CreateSubjectPayload {
  subject_id: string;
  group_id: string;
  teacher_id: string;
}

export interface UpdateSubjectPayload extends CreateSubjectPayload {
  id: string;
}

// responses

export type GetSubjectCategoriesResponse = AxiosResponse<SubjectCategory[]>;
export type CreateSubjectCategoryResponse = AxiosResponse<SubjectCategory>;
export type UpdateSubjectCategoryResponse = AxiosResponse<SubjectCategory>;

export type GetSubjectsResponse = AxiosResponse<SubjectDto[]>;
export type GetSubjectResponse = AxiosResponse<FullSubjectDto>;
export type CreateSubjectResponse = AxiosResponse<SubjectDto>;
export type UpdateSubjectResponse = AxiosResponse<SubjectDto>;
