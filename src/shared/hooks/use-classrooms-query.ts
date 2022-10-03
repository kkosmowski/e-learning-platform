import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { GetClassroomsResponse, SimpleClassroom } from 'shared/types/classroom';
import { getClassrooms } from 'api/classroom';

export function useClassroomsQuery() {
  const fetchQuery = useQuery<
    GetClassroomsResponse,
    AxiosError,
    SimpleClassroom[]
  >(['classrooms'], getClassrooms, {
    select: ({ data }) => data,
  });

  return {
    classrooms: fetchQuery.data,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
  };
}
