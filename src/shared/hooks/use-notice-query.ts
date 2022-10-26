import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getNotice } from 'api/notice';
import { GetNoticeResponse, NoticeDto } from 'shared/types/notice';
import { User } from 'shared/types/user';
import { mapNoticeDtoToNotice } from 'shared/utils/notice.utils';

export function useNoticeQuery(
  currentUser: User | null | undefined,
  noticeId: string | undefined
) {
  const fetchQuery = useQuery<GetNoticeResponse, AxiosError, NoticeDto>(
    ['notice', noticeId],
    () => getNotice(noticeId || ''),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && noticeId),
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
  };
}
