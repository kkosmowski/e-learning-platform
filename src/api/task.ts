import { authorized } from './axios';
import {
  CreateTaskPayload,
  CreateTaskResponse,
  // GetTaskResponse,
  GetTasksResponse,
  TaskType,
} from 'shared/types/task';

export const getSubjectTasks = (
  subjectId: string,
  type?: TaskType
): Promise<GetTasksResponse> =>
  authorized((api) =>
    api.get(`group-subject/${subjectId}/tasks${type ? `?type=${type}` : ''}`)
  );

// export const getTask = (taskId: string): Promise<GetTaskResponse> =>
//   authorized((api) => api.get(`task/${taskId}`));
//
export const createTask = (
  payload: CreateTaskPayload
): Promise<CreateTaskResponse> =>
  authorized((api) => api.post('task', payload));
