import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { GetSubjectStudentsResponse, UserDto } from 'shared/types/user';
import { getSubjectStudents } from 'api/subject';
import { mapUserDtoToUser } from 'shared/utils/user.utils';

export function useSubjectStudentsQuery() {
  const [subjectId, setSubjectId] = useState<string | null>(null);

  const studentsQuery = useQuery<
    GetSubjectStudentsResponse,
    AxiosError,
    UserDto[]
  >(
    ['subject-students', subjectId],
    () => getSubjectStudents(subjectId || ''),
    {
      enabled: !!subjectId,
      select: ({ data }) => data,
    }
  );

  const fetchStudents = useCallback((subId: string) => {
    setSubjectId(subId);
  }, []);

  const students = useMemo(
    () => studentsQuery.data?.map(mapUserDtoToUser),
    [studentsQuery.data]
  );

  return {
    students,
    fetchStudents,
    isLoading: studentsQuery.isLoading,
    isSuccess: studentsQuery.isSuccess,
  };
}
