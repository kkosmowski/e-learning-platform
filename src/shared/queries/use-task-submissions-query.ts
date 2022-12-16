import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from 'contexts/auth';
import {
  GetTaskSubmissionsResponse,
  TaskSubmissionDto,
} from 'shared/types/task';
import { getTaskSubmissions } from 'api/task';
import { mapTaskSubmissionDtoToTaskSubmission } from 'shared/utils/task.utils';

export function useTaskSubmissionsQuery(taskId?: string, enabled?: boolean) {
  const { currentUser } = useAuth();

  if (!taskId) {
    console.error(
      'Task submissions query: Trying to fetch submissions without providing taskId.'
    );
  }

  const taskSubmissionsQuery = useQuery<
    GetTaskSubmissionsResponse,
    AxiosError,
    TaskSubmissionDto[]
  >(['task-submissions', taskId], () => getTaskSubmissions(taskId || ''), {
    select: ({ data }) => data,
    enabled: Boolean(currentUser && taskId && enabled),
  });

  const taskSubmissions = useMemo(
    () =>
      taskSubmissionsQuery.data?.map(mapTaskSubmissionDtoToTaskSubmission) ||
      [],
    [taskSubmissionsQuery.data]
  );

  return {
    taskSubmissions,
    isLoading: taskSubmissionsQuery.isLoading,
    isSuccess: taskSubmissionsQuery.isSuccess,
  };
}
