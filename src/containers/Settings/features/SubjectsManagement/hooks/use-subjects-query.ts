import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getSubjects } from 'api/subject';
import { GetSubjectsResponse, SubjectDto } from 'shared/types/subject';
import { useMemo } from 'react';
import { mapSubjectDtoToSubject } from '../../../../../shared/utils/subject.utils';

export default function useSubjectsQuery() {
  const fetchQuery = useQuery<GetSubjectsResponse, AxiosError, SubjectDto[]>(
    ['subjects'],
    getSubjects,
    {
      select: ({ data }) => data,
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
