import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { GetTasksResponse, TaskDto, TaskType } from 'shared/types/task';
import { getSubjectTasks } from 'api/task';
import { mapTaskDtoToTask } from 'shared/utils/task.utils';
import { useAuth } from 'contexts/auth';

export function useTasksQuery(subjectId: string | undefined) {
  const { currentUser } = useAuth();

  const tasksQuery = useQuery<GetTasksResponse, AxiosError, TaskDto[]>(
    ['tasks', 'task', subjectId],
    () => getSubjectTasks(subjectId || '', TaskType.Task),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && subjectId),
    }
  );

  const homeworkQuery = useQuery<GetTasksResponse, AxiosError, TaskDto[]>(
    ['tasks', 'homework', subjectId],
    () => getSubjectTasks(subjectId || '', TaskType.Homework),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && subjectId),
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

  return {
    tasks,
    homework,
    // allTasks,
    tasksLoading: tasksQuery.isLoading,
    tasksSuccess: tasksQuery.isSuccess,
    homeworkLoading: homeworkQuery.isLoading,
    homeworkSuccess: homeworkQuery.isSuccess,
  };
}
