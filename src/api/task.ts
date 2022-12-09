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
  GetTaskSubmissionResponse,
  GetTaskSubmissionsResponse,
  SubmitTaskResponse,
  SubmitTaskPayload,
} from 'shared/types/task';
import { TASK_LIST_PAGE_SIZE } from 'shared/consts/task';
import { EmptyResponse } from 'shared/types/shared';

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

export const getFinishedOrSubmittedTasks = (
  subjectId: string,
  studentId: string,
  offset: number
): Promise<GetTasksResponse> =>
  authorized((api) =>
    api.get(
      `group-subject/${subjectId}/tasks/${studentId}?limit=${TASK_LIST_PAGE_SIZE}&offset=${offset}`
    )
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

export const deleteTask = (id: string): Promise<EmptyResponse> =>
  authorized((api) => api.delete(`task/${id}`));

// submission

export const getTaskSubmission = (
  taskId: string
): Promise<GetTaskSubmissionResponse> =>
  authorized((api) => api.get(`task/${taskId}/submission`));

export const getTaskSubmissions = (
  taskId: string
): Promise<GetTaskSubmissionsResponse> =>
  authorized((api) => api.get(`task/${taskId}/submissions`));

export const updateTaskSubmission = ({
  taskId,
  formData,
}: SubmitTaskPayload): Promise<SubmitTaskResponse> =>
  authorized((api) => api.put(`task/submit/${taskId}`, formData));
