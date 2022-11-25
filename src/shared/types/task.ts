import { ContentItem, Paginated, Status } from './shared';
import { AxiosResponse } from 'axios';
import { SubjectDto } from './subject';
import { User, UserDto } from './user';

export interface Task extends ContentItem {
  mandatory: boolean;
  type: TaskType;
  startTime: Date;
  endTime: Date;
  isPublished: boolean;
  canBeDeletedBefore: Date;
}

export enum TaskType {
  Task = 'task',
  Homework = 'homework',
}

export interface TaskSubmissionForm {
  comment: string;
  file: File | null;
}

export interface SimpleTaskSubmission {
  id: string;
  taskId: string;
  createdAt: Date;
  status: Status;
  fileUrl: string;
  comment: string;
}

export interface TaskSubmission extends SimpleTaskSubmission {
  createdBy: User;
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

export interface SimpleTaskSubmissionDto {
  id: string;
  task_id: string;
  created_at: string;
  status: Status;
  file_url: string;
  comment: string;
}

export interface TaskSubmissionDto extends SimpleTaskSubmissionDto {
  user: UserDto;
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

export interface LatestTasksDto {
  tasks: TaskDto[];
  homework: TaskDto[];
  task_submissions: TaskSubmissionDto[];
  homework_submissions: TaskSubmissionDto[];
}

export interface LatestTasks {
  tasks?: Task[];
  homework?: Task[];
  taskSubmissions?: TaskSubmission[];
  homeworkSubmissions?: TaskSubmission[];
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

export interface SubmitTaskPayload {
  taskId: string;
  formData: FormData;
}

// responses

export type GetTasksResponse = AxiosResponse<Paginated<TaskDto>>;
export type GetLatestTasksResponse = AxiosResponse<LatestTasksDto>;
export type GetTaskResponse = AxiosResponse<TaskDto>;
export type GetTaskSubmissionResponse = AxiosResponse<SimpleTaskSubmissionDto>;
export type GetTaskSubmissionsResponse = AxiosResponse<TaskSubmissionDto[]>;
export type SubmitTaskResponse = AxiosResponse<SimpleTaskSubmissionDto>;
export type CreateTaskResponse = AxiosResponse<TaskDto>;
export type UpdateTaskResponse = AxiosResponse<TaskDto>;
