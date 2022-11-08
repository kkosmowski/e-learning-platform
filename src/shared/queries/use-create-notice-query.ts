import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { createNotice } from 'api/notice';
import { getErrorDetail } from 'shared/utils/common.utils';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { CreateNoticeResponse, NoticeForm } from 'shared/types/notice';
import { mapNoticeFormToCreateNoticePayload } from 'shared/utils/notice.utils';

export function useCreateNoticeQuery() {
  const { t } = useTranslation('notice');
  const { navigate } = useCustomNavigate();
  const queryClient = useQueryClient();

  const { mutate: handleCreate } = useMutation<
    CreateNoticeResponse,
    AxiosError,
    NoticeForm
  >((form) => createNotice(mapNoticeFormToCreateNoticePayload(form)), {
    onSuccess: async ({ data }: CreateNoticeResponse) => {
      toast.success(t('create.toast.success', { name: data.name }));
      await queryClient.invalidateQueries(['notices']);
      navigate(`../${data.id}`);
    },
    onError: (err) => {
      const error = getErrorDetail(err);
      toast.error(t(error));
    },
  });

  return handleCreate;
}
