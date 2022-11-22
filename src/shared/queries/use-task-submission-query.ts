import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'contexts/auth';
import useCustomNavigate from 'hooks/use-custom-navigate';
import {
  GetTaskSubmissionResponse,
  TaskSubmissionDto,
} from 'shared/types/task';
import { getTaskSubmission } from 'api/task';
import { mapTaskSubmissionDtoToTaskSubmission } from '../utils/task.utils';

export function useTaskSubmissionQuery(taskId?: string) {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { navigate, back } = useCustomNavigate();
  const { t } = useTranslation('task');

  if (!taskId) {
    console.error(
      'Task submission query: Trying to fetch submission without providing taskId.'
    );
  }

  const taskSubmissionQuery = useQuery<
    GetTaskSubmissionResponse,
    AxiosError,
    TaskSubmissionDto
  >(
    ['task-submission', taskId, currentUser?.id],
    () => getTaskSubmission(taskId || ''),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && taskId),
    }
  );

  const taskSubmission = useMemo(
    () =>
      taskSubmissionQuery.data
        ? mapTaskSubmissionDtoToTaskSubmission(taskSubmissionQuery.data)
        : undefined,
    [taskSubmissionQuery.data]
  );

  return {
    taskSubmission,
    isLoading: taskSubmissionQuery.isLoading,
    isSuccess: taskSubmissionQuery.isSuccess,
  };
}
