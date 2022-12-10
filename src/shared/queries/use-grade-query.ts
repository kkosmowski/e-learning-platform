import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { GetGradeResponse, GradeDto } from 'shared/types/grade';
import { getGrade } from 'api/grade';
import { useAuth } from 'contexts/auth';
import { mapGradeDtoToGrade } from 'shared/utils/grade.utils';

export function useGradeQuery(taskId: string) {
  const { currentUser } = useAuth();

  const gradeQuery = useQuery<GetGradeResponse, AxiosError, GradeDto>(
    ['grade', taskId, currentUser?.id],
    () => getGrade(taskId),
    {
      enabled: Boolean(currentUser && taskId),
      select: ({ data }) => data,
    }
  );

  const grade = useMemo(
    () => (gradeQuery.data ? mapGradeDtoToGrade(gradeQuery.data) : null),
    [gradeQuery.data]
  );

  return {
    grade,
    isLoading: gradeQuery.isLoading,
    isSuccess: gradeQuery.isSuccess,
  };
}
