import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getNotice, updateNotice } from 'api/notice';
import {
  GetNoticeResponse,
  NoticeDto,
  NoticeForm,
  UpdateNoticeResponse,
} from 'shared/types/notice';
import {
  mapNoticeDtoToNotice,
  mapNoticeFormToUpdateNoticePayload,
} from 'shared/utils/notice.utils';
import { useAuth } from 'contexts/auth';

export function useNoticeQuery(noticeId: string | undefined) {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation('notice');

  const fetchQuery = useQuery<GetNoticeResponse, AxiosError, NoticeDto>(
    ['notice', noticeId],
    () => getNotice(noticeId || ''),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && noticeId),
      notifyOnChangeProps: ['data'],
    }
  );

  const { mutate: update } = useMutation<
    UpdateNoticeResponse,
    AxiosError,
    NoticeForm
  >(
    async (values) => {
      if (fetchQuery.data) {
        return updateNotice(
          mapNoticeFormToUpdateNoticePayload(fetchQuery.data.id, values)
        );
      } else throw new Error('Notice id is missing');
    },
    {
      onSuccess: async ({ data }) => {
        queryClient.setQueryData(['notice', noticeId], { data });
        await queryClient.invalidateQueries(['notices']);
        navigate(-1);
        toast.success(t('toast.updateSuccess', { name: data.name }));
      },
      onError: (e) => {
        toast.error(t('error:ERROR'));
      },
    }
  );

  const notice = useMemo(() => {
    if (fetchQuery.data) {
      return mapNoticeDtoToNotice(fetchQuery.data);
    }
    return undefined;
  }, [fetchQuery.data]);

  return {
    notice,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
    isError: fetchQuery.isError,
    update,
  };
}
