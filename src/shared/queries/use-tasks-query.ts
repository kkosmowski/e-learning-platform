import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  GetTaskResponse,
  GetTasksResponse,
  GetLatestTasksResponse,
  TaskDto,
  TaskType,
  LatestTasksDto,
  LatestTasks,
} from 'shared/types/task';
import { getLatestTasks, getSubjectTasks, getTask } from 'api/task';
import { mapTaskDtoToTask } from 'shared/utils/task.utils';
import { useAuth } from 'contexts/auth';
import { VISIBLE_LATEST_TASKS } from '../consts/task';

export function useTasksQuery(options: {
  subjectId?: string;
  taskId?: string;
  enabled?: (TaskType | 'latest')[];
}) {
  const { subjectId, taskId, enabled = [] } = options;
  const { currentUser } = useAuth();

  if (!enabled.length && subjectId) {
    console.error(
      'Tasks query: Trying to fetch subjects tasks/homework with enabled array empty.'
    );
  } else if (!subjectId && !taskId) {
    console.error('Tasks query: Neither subjectId nor taskId was provided.');
  }

  const tasksQuery = useQuery<GetTasksResponse, AxiosError, TaskDto[]>(
    ['tasks', 'task', subjectId],
    () => getSubjectTasks(subjectId || '', TaskType.Task),
    {
      select: ({ data }) => data,
      enabled:
        Boolean(currentUser && subjectId) && enabled.includes(TaskType.Task),
    }
  );

  const homeworkQuery = useQuery<GetTasksResponse, AxiosError, TaskDto[]>(
    ['tasks', 'homework', subjectId],
    () => getSubjectTasks(subjectId || '', TaskType.Homework),
    {
      select: ({ data }) => data,
      enabled:
        Boolean(currentUser && subjectId) &&
        enabled.includes(TaskType.Homework),
    }
  );

  const latestTasksQuery = useQuery<
    GetLatestTasksResponse,
    AxiosError,
    LatestTasksDto
  >(
    ['tasks', 'latest', subjectId],
    () => getLatestTasks(subjectId || '', VISIBLE_LATEST_TASKS),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && subjectId) && enabled.includes('latest'),
    }
  );

  const taskQuery = useQuery<GetTaskResponse, AxiosError, TaskDto>(
    ['task', taskId],
    () => getTask(taskId || ''),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && taskId),
    }
  );

  const tasks = useMemo(
    () => tasksQuery.data?.map(mapTaskDtoToTask),
    [tasksQuery.data]
  );
  const homework = useMemo(
    () => homeworkQuery.data?.map(mapTaskDtoToTask),
    [homeworkQuery.data]
  );

  const latestTasks: LatestTasks = useMemo(
    () => ({
      tasks: latestTasksQuery.data?.tasks.map(mapTaskDtoToTask),
      homework: latestTasksQuery.data?.homework.map(mapTaskDtoToTask),
    }),
    [latestTasksQuery.data]
  );

  const task = useMemo(
    () => (taskQuery.data ? mapTaskDtoToTask(taskQuery.data) : undefined),
    [taskQuery.data]
  );

  return {
    task,
    tasks,
    homework,
    latestTasks,
    taskLoading: taskQuery.isLoading,
    taskSuccess: taskQuery.isSuccess,
    tasksLoading: tasksQuery.isLoading,
    tasksSuccess: tasksQuery.isSuccess,
    homeworkLoading: homeworkQuery.isLoading,
    homeworkSuccess: homeworkQuery.isSuccess,
    latestTasksLoading: latestTasksQuery.isLoading,
    latestTasksSuccess: latestTasksQuery.isSuccess,
  };
}
