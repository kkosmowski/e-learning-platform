import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { createNotice } from 'api/notice';
import { getErrorDetail } from 'shared/utils/common.utils';
import { CreateNoticeResponse, NoticeForm } from 'shared/types/notice';
import { mapNoticeFormToCreateNoticePayload } from 'shared/utils/notice.utils';
import { ERROR_TOAST_DURATION } from 'shared/consts/error';

export function useCreateNoticeQuery() {
  const { t } = useTranslation('notice');
  const navigate = useNavigate();
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
    onError: (error) => {
      toast.error(t(getErrorDetail(error)), { duration: ERROR_TOAST_DURATION });
    },
  });

  return handleCreate;
}
