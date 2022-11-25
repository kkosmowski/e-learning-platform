import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'contexts/auth';
import useCustomNavigate from 'hooks/use-custom-navigate';
import {
  GetTaskSubmissionResponse,
  SubmitTaskPayload,
  SubmitTaskResponse,
  TaskSubmissionDto,
} from 'shared/types/task';
import { getTaskSubmission, updateTaskSubmission } from 'api/task';
import { mapTaskSubmissionDtoToTaskSubmission } from 'shared/utils/task.utils';
import toast from 'react-hot-toast';

export function useTaskSubmissionQuery(taskId?: string, enabled?: boolean) {
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
    onError: (e) => {
      toast.error(t('error:ERROR'));
    },
  });

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
    submitSolution,
  };
}
