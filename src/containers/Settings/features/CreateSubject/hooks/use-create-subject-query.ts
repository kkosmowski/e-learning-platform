import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SimpleSubjectDto, SubjectForm } from 'shared/types/subject';
import { createSubject } from 'api/subject';
import { getErrorDetail } from 'shared/utils/common.utils';

type MutationFnPayload = { values: SubjectForm; show?: boolean };
type MutationFnReturnData = { data: SimpleSubjectDto; show?: boolean };

export default function useCreateSubjectQuery() {
  const { t } = useTranslation('settings');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: handleCreate } = useMutation<
    MutationFnReturnData,
    AxiosError,
    MutationFnPayload
  >(
    async ({
      values,
      show,
    }: MutationFnPayload): Promise<MutationFnReturnData> => {
      const { data } = await createSubject(values);
      return { data, show };
    },
    {
      onSuccess: async ({ data, show }) => {
        toast.success(
          t('subjects.toast.createSuccess', {
            name: `${data.subject.name} (${data.group.name})`,
          })
        );
        await queryClient.invalidateQueries(['subjects']);
        navigate(show ? `../${data.id}` : '..');
      },
      onError: (err) => {
        const error = getErrorDetail(err);
        toast.error(t(error));
      },
    }
  );

  return handleCreate;
}
