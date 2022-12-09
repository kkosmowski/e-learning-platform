import { Task, TaskDto } from './task';
import { SimpleUser, SimpleUserDto } from './user';
import { SimpleSubject, SimpleSubjectDto } from './subject';
import { AxiosResponse } from 'axios';

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

export enum CalculatedGradeType {
  AVERAGE = 'average',
  PROPOSED = 'proposed',
  FINAL = 'final',
}

export interface GradeDto {
  id: string;
  group_subject: SimpleSubjectDto;
  user: SimpleUserDto;
  task?: TaskDto;
  type: GradeType;
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
  type: GradeType;
  name?: string;
  value: number;
  createdAt: Date;
  createdBy: SimpleUser;
}

export interface CreateGradeForm {
  subjectId: string;
  studentId: string;
  type: GradeType;
  taskId: string | null;
  name: string;
  value: number;
}

// payloads

export interface CreateGradePayload {
  group_subject_id: string;
  student_id: string;
  task_id?: string;
  type: GradeType;
  name?: string;
  value: number;
}

export interface UpdateGradePayload {
  id: string;
  value: number;
}

// responses

export type CreateGradeResponse = AxiosResponse<GradeDto>;
export type UpdateGradeResponse = AxiosResponse<GradeDto>;
export type GetGradeResponse = AxiosResponse<GradeDto>;
export type GetGradesResponse = AxiosResponse<GradeDto[]>;
