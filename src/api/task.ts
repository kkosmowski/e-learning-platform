import { authorized } from './axios';
import {
  CreateTaskPayload,
  CreateTaskResponse,
  GetTaskResponse,
  GetTasksResponse,
  GetLatestTasksResponse,
  TaskType,
  UpdateTaskPayload,
  UpdateTaskResponse,
} from 'shared/types/task';
import { TASK_LIST_PAGE_SIZE } from 'shared/consts/task';

export const getSubjectTasks = (
  subjectId: string,
  offset: number,
  type?: TaskType
): Promise<GetTasksResponse> =>
  authorized((api) =>
    api.get(
      `group-subject/${subjectId}/tasks?limit=${TASK_LIST_PAGE_SIZE}&offset=${offset}${
        type ? `&type=${type}` : ''
      }`
    )
  );

export const getLatestTasks = (
  subjectId: string,
  limit: number
): Promise<GetLatestTasksResponse> =>
  authorized((api) =>
    api.get(`group-subject/${subjectId}/latest-tasks?limit=${limit}`)
  );

export const getTask = (taskId: string): Promise<GetTaskResponse> =>
  authorized((api) => api.get(`task/${taskId}`));

export const createTask = (
  payload: CreateTaskPayload
): Promise<CreateTaskResponse> =>
  authorized((api) => api.post('task', payload));

export const updateTask = ({
  id,
  ...data
}: UpdateTaskPayload): Promise<UpdateTaskResponse> =>
  authorized((api) => api.patch(`task/${id}`, data));
