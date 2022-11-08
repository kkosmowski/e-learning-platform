import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { GetClassesResponse, SimpleClass } from 'shared/types/class';
import { getClasses } from 'api/class';

export function useClassesQuery() {
  const fetchQuery = useQuery<GetClassesResponse, AxiosError, SimpleClass[]>(
    ['classes'],
    getClasses,
    {
      select: ({ data }) => data,
    }
  );

  return {
    classes: fetchQuery.data,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
  };
}
