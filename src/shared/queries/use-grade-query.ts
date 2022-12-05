import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { getErrorDetail } from 'shared/utils/common.utils';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { mapCreateGradeFormToCreateGradePayload } from 'shared/utils/grade.utils';
import { createGrade } from 'api/grade';
import { CreateGradeForm, CreateGradeResponse } from 'shared/types/grade';

export function useGradeQuery() {
  const { t } = useTranslation('grade');
  const { navigate } = useCustomNavigate();
  const queryClient = useQueryClient();

  const { mutate: handleCreate } = useMutation<
    CreateGradeResponse,
    AxiosError,
    CreateGradeForm
  >((form) => createGrade(mapCreateGradeFormToCreateGradePayload(form)), {
    onSuccess: async ({ data }: CreateGradeResponse) => {
      // toast.success(t('create.toast.success', { name: data.name }));
      await queryClient.invalidateQueries(['grades']);
      // navigate(
      //   `./../../${data.type === GradeType.Grade ? 'tasks' : 'homework'}/${
      //     data.id
      //   }`
      // );
    },
    onError: (err) => {
      const error = getErrorDetail(err);
      toast.error(t(error));
    },
  });

  return handleCreate;
}
