import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getSubjects } from 'api/subject';
import { GetSubjectsResponse, SubjectDto } from 'shared/types/subject';
import { mapSubjectDtoToSubject } from 'shared/utils/subject.utils';
import { User } from 'shared/types/user';

export function useSubjectsQuery(currentUser: User | null | undefined) {
  const fetchQuery = useQuery<GetSubjectsResponse, AxiosError, SubjectDto[]>(
    ['subjects'],
    getSubjects,
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser),
    }
  );

  const subjects = useMemo(
    () => fetchQuery.data?.map(mapSubjectDtoToSubject),
    [fetchQuery.data]
  );

  return {
    subjects,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
  };
}
