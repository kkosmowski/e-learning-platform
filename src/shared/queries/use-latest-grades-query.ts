import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getLatestGrades } from 'api/grade';
import { GetGradesResponse, Grade, GradeDto } from 'shared/types/grade';
import { LATEST_GRADES_VISIBLE_COUNT } from 'shared/consts/grade';
import { useAuth } from 'contexts/auth';
import { mapGradeDtoToGrade } from 'shared/utils/grade.utils';

export const useLatestGradesQuery = (subjectId: string) => {
  const { currentUser } = useAuth();

  const latestGradesQuery = useQuery<GetGradesResponse, AxiosError, GradeDto[]>(
    ['grades', 'latest', subjectId, currentUser?.id],
    () => getLatestGrades(subjectId || '', LATEST_GRADES_VISIBLE_COUNT),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && subjectId),
    }
  );

  const latestGrades: Grade[] = useMemo(
    () => latestGradesQuery.data?.map(mapGradeDtoToGrade) || [],
    [latestGradesQuery.data]
  );

  return {
    latestGrades: latestGrades,
    isLoading: latestGradesQuery.isLoading,
    isSuccess: latestGradesQuery.isSuccess,
  };
};
