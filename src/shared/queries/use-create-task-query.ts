import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { createTask } from 'api/task';
import { getErrorDetail } from 'shared/utils/common.utils';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { CreateTaskResponse, TaskForm, TaskType } from 'shared/types/task';
import { mapTaskFormToCreateTaskPayload } from 'shared/utils/task.utils';

export function useCreateTaskQuery() {
  const { t } = useTranslation('task');
  const { navigate } = useCustomNavigate();
  const queryClient = useQueryClient();

  const { mutate: handleCreate } = useMutation<
    CreateTaskResponse,
    AxiosError,
    TaskForm
  >((form) => createTask(mapTaskFormToCreateTaskPayload(form)), {
    onSuccess: async ({ data }: CreateTaskResponse) => {
      toast.success(t('create.toast.success', { name: data.name }));
      await queryClient.invalidateQueries(['tasks']);
      navigate(
        `./../../${data.type === TaskType.Task ? 'tasks' : 'homework'}/${
          data.id
        }`
      );
    },
    onError: (err) => {
      const error = getErrorDetail(err);
      toast.error(t(error));
    },
  });

  return handleCreate;
}
