import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ClassroomForm, SimpleClassroomDto } from 'shared/types/classroom';
import { createClassroom } from 'api/classroom';
import { getErrorDetail } from 'shared/utils/common.utils';

type MutationFnPayload = { values: ClassroomForm; show?: boolean };
type MutationFnReturnData = { data: SimpleClassroomDto; show?: boolean };

export default function useCreateClassroomQuery() {
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
      const { data } = await createClassroom(values);
      return { data, show };
    },
    {
      onSuccess: async ({ data, show }) => {
        toast.success(
          t('classrooms.create.createSuccessToast', { name: data.name })
        );
        await queryClient.invalidateQueries(['classrooms']);
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
