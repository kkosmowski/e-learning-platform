import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getFullSubjects, getSubjects } from 'api/subject';
import {
  GetFullSubjectsResponse,
  GetSubjectsResponse,
  SimpleSubjectDto,
  SubjectDto,
} from 'shared/types/subject';
import {
  mapSimpleSubjectDtoToSimpleSubject,
  mapSubjectDtoToSubject,
} from 'shared/utils/subject.utils';
import { User } from 'shared/types/user';

export function useSubjectsQuery(
  currentUser: User | null | undefined,
  options: {
    simple?: boolean;
    full?: boolean;
  }
) {
  const fetchQuery = useQuery<
    GetSubjectsResponse,
    AxiosError,
    SimpleSubjectDto[]
  >(['subjects'], getSubjects, {
    select: ({ data }) => data,
    enabled: Boolean(currentUser && options?.simple),
  });

  const detailedFetchQuery = useQuery<
    GetFullSubjectsResponse,
    AxiosError,
    SubjectDto[]
  >(['subjects', 'full'], getFullSubjects, {
    select: ({ data }) => data,
    enabled: Boolean(currentUser && options?.full),
  });

  const subjects = useMemo(
    () => fetchQuery.data?.map(mapSimpleSubjectDtoToSimpleSubject),
    [fetchQuery.data]
  );

  const fullSubjects = useMemo(
    () => detailedFetchQuery.data?.map(mapSubjectDtoToSubject),
    [detailedFetchQuery.data]
  );

  return {
    subjects,
    fullSubjects,
    isLoading:
      (options.simple && fetchQuery.isLoading) ||
      (options.full && detailedFetchQuery.isLoading),
    isSuccess:
      (options.simple && fetchQuery.isSuccess) ||
      (options.full && detailedFetchQuery.isSuccess),
  };
}
