import { AxiosResponse } from 'axios';
import { ClassroomDto, SubjectClassroom } from './classroom';
import { User, UserDto } from './user';

export interface SubjectCategory {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
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

// responses

export type GetSubjectCategoriesResponse = AxiosResponse<SubjectCategory[]>;
export type CreateSubjectCategoryResponse = AxiosResponse<SubjectCategory>;
export type UpdateSubjectCategoryResponse = AxiosResponse<SubjectCategory>;

export type GetSubjectsResponse = AxiosResponse<SubjectDto[]>;
export type CreateSubjectResponse = AxiosResponse<SubjectDto>;
export type UpdateSubjectResponse = AxiosResponse<SubjectDto>;
