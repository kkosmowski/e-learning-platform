import { BaseItem, ContentItem, Status } from './shared';
import { AxiosResponse } from 'axios';
import { SubjectDto } from './subject';
import { UserDto } from './user';

export interface Task extends ContentItem {
  mandatory: boolean;
  type: TaskType;
  status: Status; // @todo decide if this should stay
  startTime: Date;
  endTime: Date;
}

export enum TaskType {
  Task = 'task',
  Homework = 'homework',
}

export interface TaskSubmission extends BaseItem {
  taskId: string; // @todo consider full task data
  studentId: string; // @todo consider full student data
  status: Status;
  // fileUrl: string;
  // comment: string;
}

export interface TaskDto {
  id: string;
  group_subject: SubjectDto;
  created_by: UserDto;
  mandatory: boolean;
  type: TaskType;
  name: string;
  content: string;
  created_at: string;
  start_time: string;
  end_time: string;
}

export interface TaskForm {
  subjectId: string;
  mandatory: boolean;
  type: TaskType;
  name: string;
  content: string;
  startTime: Date | null;
  endTime: Date | null;
}

// payloads

export interface UpdateTaskPayload {
  name: string;
  content: string;
  type: string;
  mandatory: boolean;
  start_time: Date;
  end_time: Date;
}

export interface CreateTaskPayload extends UpdateTaskPayload {
  group_subject_id: string;
}

// responses

export type GetTasksResponse = AxiosResponse<TaskDto[]>;
export type GetTaskResponse = AxiosResponse<TaskDto>;
export type CreateTaskResponse = AxiosResponse<TaskDto>;
export type UpdateTaskResponse = AxiosResponse<TaskDto>;
