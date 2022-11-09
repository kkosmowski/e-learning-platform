import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  GetTaskResponse,
  GetTasksResponse,
  TaskDto,
  TaskType,
} from 'shared/types/task';
import { getSubjectTasks, getTask } from 'api/task';
import { mapTaskDtoToTask } from 'shared/utils/task.utils';
import { useAuth } from 'contexts/auth';

export function useTasksQuery(options: {
  subjectId?: string;
  taskId?: string;
  enabled?: TaskType[];
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

  const task = useMemo(
    () => (taskQuery.data ? mapTaskDtoToTask(taskQuery.data) : undefined),
    [taskQuery.data]
  );

  return {
    task,
    tasks,
    homework,
    // allTasks,
    taskLoading: taskQuery.isLoading,
    taskSuccess: taskQuery.isSuccess,
    tasksLoading: tasksQuery.isLoading,
    tasksSuccess: tasksQuery.isSuccess,
    homeworkLoading: homeworkQuery.isLoading,
    homeworkSuccess: homeworkQuery.isSuccess,
  };
}
