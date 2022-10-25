import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getNotices } from 'api/notice';
import { GetNoticesResponse, NoticeDto } from 'shared/types/notice';
import { User } from 'shared/types/user';
import { mapNoticeDtoToNotice } from 'shared/utils/notice.utils';

export function useNoticesQuery(
  currentUser: User | null | undefined,
  subjectId: string | undefined
) {
  const fetchQuery = useQuery<GetNoticesResponse, AxiosError, NoticeDto[]>(
    ['notices', subjectId],
    () => getNotices(subjectId || ''),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && subjectId),
    }
  );

  const notices = useMemo(
    () => fetchQuery.data?.map(mapNoticeDtoToNotice),
    [fetchQuery.data]
  );

  return {
    notices,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
  };
}
