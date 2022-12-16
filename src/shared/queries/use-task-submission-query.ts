import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { useAuth } from 'contexts/auth';
import {
  GetTaskSubmissionResponse,
  SubmitTaskPayload,
  SubmitTaskResponse,
  SimpleTaskSubmissionDto,
} from 'shared/types/task';
import { getTaskSubmission, updateTaskSubmission } from 'api/task';
import { mapSimpleTaskSubmissionDtoToSimpleTaskSubmission } from 'shared/utils/task.utils';

export function useTaskSubmissionQuery(taskId?: string, enabled?: boolean) {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { t } = useTranslation('task');

  if (!taskId) {
    console.error(
      'Task submission query: Trying to fetch submission without providing taskId.'
    );
  }

  const taskSubmissionQuery = useQuery<
    GetTaskSubmissionResponse,
    AxiosError,
    SimpleTaskSubmissionDto
  >(
    ['task-submission', taskId, currentUser?.id],
    () => getTaskSubmission(taskId || ''),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && taskId && enabled),
    }
  );

  const { mutate: submitSolution } = useMutation<
    SubmitTaskResponse,
    AxiosError,
    SubmitTaskPayload
  >(updateTaskSubmission, {
    onSuccess: async ({ data }) => {
      queryClient.setQueryData(['task-submission', taskId, currentUser?.id], {
        data,
      });
      toast.success(t('toast.submitSuccess'));
    },
    onError: () => {
      toast.error(t('error:ERROR'));
    },
  });

  const taskSubmission = useMemo(
    () =>
      taskSubmissionQuery.data
        ? mapSimpleTaskSubmissionDtoToSimpleTaskSubmission(
            taskSubmissionQuery.data
          )
        : undefined,
    [taskSubmissionQuery.data]
  );

  return {
    taskSubmission,
    isLoading: taskSubmissionQuery.isLoading,
    isSuccess: taskSubmissionQuery.isSuccess,
    submitSolution,
  };
}
