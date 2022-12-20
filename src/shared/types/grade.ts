import { Task, TaskDto } from './task';
import { SimpleUser, SimpleUserDto } from './user';
import { SimpleSubject, SimpleSubjectDto } from './subject';
import { AxiosResponse } from 'axios';
import { Paginated } from './shared';

// export interface Grade extends BaseItem {
//   source?: Task | Test;
//   type: GradeType;
//   value: number;
//   student: User;
// }
//

export enum GradeType {
  ASSIGNMENT = 'assignment',
  ACTIVITY = 'activity',
  BEHAVIOUR = 'behaviour',
}

export enum VirtualGradeType {
  AVERAGE = 'average',
  PROPOSED = 'proposed',
  FINAL = 'final',
}

export interface GradeDto {
  id: string;
  group_subject: SimpleSubjectDto;
  user: SimpleUserDto;
  task?: TaskDto;
  type: GradeType | VirtualGradeType;
  name?: string;
  value: number;
  created_at: string;
  created_by: SimpleUserDto;
}

export interface Grade {
  id: string;
  subject: SimpleSubject;
  user: SimpleUser;
  task?: Task;
  type: GradeType | VirtualGradeType;
  name?: string;
  value: number;
  createdAt: Date;
  createdBy: SimpleUser;
}

export interface VirtualGrade {
  id: string;
  subject: SimpleSubject;
  user: SimpleUser;
  type: VirtualGradeType;
  value?: number;
  createdAt?: Date;
}

export interface GradesSummary {
  average?: number;
  proposed?: number;
  final?: number;
}

export interface SubjectGradesDto {
  subject_name: string;
  grades: GradesSummary;
}

export interface SubjectGrades {
  subjectName: string;
  grades: GradesSummary;
}

export interface CreateGradeForm {
  subjectId: string;
  studentId: string;
  type: GradeType;
  taskId: string | null;
  name: string;
  value: number;
}

export interface CreateProposedGrade {
  subjectId: string;
  studentId: string;
  value: number;
}

export interface CreateFinalGrade {
  subjectId: string;
  studentId: string;
}

// payloads

export interface CreateGradePayload {
  group_subject_id: string;
  student_id: string;
  task_id?: string;
  type: GradeType | VirtualGradeType;
  name?: string;
  value: number;
}

export interface CreateProposedGradePayload {
  group_subject_id: string;
  student_id: string;
  value: number;
}

export interface CreateFinalGradePayload {
  group_subject_id: string;
  student_id: string;
}

export interface UpdateGradePayload {
  gradeId: string;
  studentId: string;
  value: number;
}

// responses

export type CreateGradeResponse = AxiosResponse<GradeDto>;
export type UpdateGradeResponse = AxiosResponse<GradeDto>;
export type GetGradeResponse = AxiosResponse<GradeDto>;
export type GetGradesResponse = AxiosResponse<GradeDto[]>;
export type GetPaginatedGradesResponse = AxiosResponse<Paginated<GradeDto>>;
export type GetGradesSummaryResponse = AxiosResponse<SubjectGradesDto[]>;
