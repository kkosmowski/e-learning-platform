import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { getErrorDetail } from 'shared/utils/common.utils';
import {
  mapCreateGradeFormToCreateGradePayload,
  mapCreateProposedGradeToCreateProposedGradePayload,
} from 'shared/utils/grade.utils';
import { createGrade, createProposedGrade } from 'api/grade';
import {
  CreateGradeForm,
  CreateGradeResponse,
  CreateProposedGrade,
} from 'shared/types/grade';

export function useCreateGradeQuery() {
  const { t } = useTranslation('grade');
  const queryClient = useQueryClient();

  const { mutate: handleCreate } = useMutation<
    CreateGradeResponse,
    AxiosError,
    CreateGradeForm
  >((form) => createGrade(mapCreateGradeFormToCreateGradePayload(form)), {
    onSuccess: async () => {
      toast.success(t('create.toast.success'));
      await queryClient.invalidateQueries(['grades']);
      await queryClient.invalidateQueries(['task-submissions']);
    },
    onError: (err) => {
      const error = getErrorDetail(err);
      toast.error(t(error));
    },
  });

  const { mutate: handleCreateProposed } = useMutation<
    CreateGradeResponse,
    AxiosError,
    CreateProposedGrade
  >(
    (grade) =>
      createProposedGrade(
        mapCreateProposedGradeToCreateProposedGradePayload(grade)
      ),
    {
      onSuccess: async () => {
        toast.success(t('create.toast.proposedSuccess'));
        await queryClient.invalidateQueries(['grades']);
      },
      onError: (err) => {
        const error = getErrorDetail(err);
        toast.error(t(error));
      },
    }
  );

  return {
    handleCreate,
    handleCreateProposed,
  };
}
