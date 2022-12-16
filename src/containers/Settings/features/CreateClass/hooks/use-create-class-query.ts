import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ClassForm, SimpleClassDto } from 'shared/types/class';
import { createClass } from 'api/class';
import { getErrorDetail } from 'shared/utils/common.utils';

type MutationFnPayload = { values: ClassForm; show?: boolean };
type MutationFnReturnData = { data: SimpleClassDto; show?: boolean };

export default function useCreateClassQuery() {
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
      const { data } = await createClass(values);
      return { data, show };
    },
    {
      onSuccess: async ({ data, show }) => {
        toast.success(
          t('classes.create.createSuccessToast', { name: data.name })
        );
        await queryClient.invalidateQueries(['classes']);
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
