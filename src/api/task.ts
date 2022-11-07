import { authorized } from './axios';
import {
  CreateTaskPayload,
  CreateTaskResponse,
  // GetTaskResponse,
  // GetTasksResponse
} from 'shared/types/task';

// export const getSubjectTasks = (
//   subjectId: string
// ): Promise<GetTasksResponse> =>
//   authorized((api) => api.get(`group-subject/${subjectId}/tasks`));

// export const getTask = (taskId: string): Promise<GetTaskResponse> =>
//   authorized((api) => api.get(`task/${taskId}`));
//
export const createTask = (
  payload: CreateTaskPayload
): Promise<CreateTaskResponse> =>
  authorized((api) => api.post('task', payload));
