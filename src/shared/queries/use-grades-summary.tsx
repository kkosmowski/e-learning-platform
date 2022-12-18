import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { GetGradesSummaryResponse, SubjectGradesDto } from 'shared/types/grade';
import { getGradesSummary } from 'api/grade';
import { useAuth } from 'contexts/auth';
import { mapSubjectGradesDtoToSubjectGrades } from 'shared/utils/grade.utils';

export function useGradesSummary() {
  const { currentUser } = useAuth();

  const summaryQuery = useQuery<
    GetGradesSummaryResponse,
    AxiosError,
    SubjectGradesDto[]
  >(['grades-summary', currentUser?.id], getGradesSummary, {
    select: ({ data }) => data,
    enabled: !!currentUser,
  });

  const gradesSummary = useMemo(
    () => summaryQuery.data?.map(mapSubjectGradesDtoToSubjectGrades),
    [summaryQuery.data]
  );

  return {
    gradesSummary,
    isLoading: summaryQuery.isLoading,
    isSuccess: summaryQuery.isSuccess,
    isFetched: summaryQuery.isFetched,
  };
}
