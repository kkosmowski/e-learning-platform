import { BaseItem, ContentItem, Paginated, Status } from './shared';
import { AxiosResponse } from 'axios';
import { SubjectDto } from './subject';
import { UserDto } from './user';

export interface Task extends ContentItem {
  mandatory: boolean;
  type: TaskType;
  status: Status; // @todo decide if this should stay
  startTime: Date;
  endTime: Date;
  isPublished: boolean;
  canBeDeletedBefore: Date;
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
  created_at: string;
  mandatory: boolean;
  type: TaskType;
  name: string;
  content: string;
  start_time: string;
  end_time: string;
  can_be_deleted_before: string;
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
  id: string;
  mandatory?: boolean;
  name?: string;
  content?: string;
  end_time?: Date;
}

export interface CreateTaskPayload {
  group_subject_id: string;
  type: TaskType;
  mandatory: boolean;
  name: string;
  content: string;
  start_time: Date;
  end_time: Date;
}

export interface LatestTasksDto {
  tasks: TaskDto[];
  homework: TaskDto[];
}

export interface LatestTasks {
  tasks?: Task[];
  homework?: Task[];
}

// responses

export type GetTasksResponse = AxiosResponse<Paginated<TaskDto>>;
export type GetLatestTasksResponse = AxiosResponse<LatestTasksDto>;
export type GetTaskResponse = AxiosResponse<TaskDto>;
export type CreateTaskResponse = AxiosResponse<TaskDto>;
export type UpdateTaskResponse = AxiosResponse<TaskDto>;
