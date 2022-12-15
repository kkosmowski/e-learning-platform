import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  GetUserWithDetailsResponse,
  UserWithDetailsDto,
} from 'shared/types/user';
import { getUserWithDetails } from 'api/user';
import { mapUserWithDetailsDtoToUserWithDetails } from 'shared/utils/user.utils';

export function useUserWithDetailsQuery() {
  const [userId, setUserId] = useState('');

  const userWithDetailsQuery = useQuery<
    GetUserWithDetailsResponse,
    AxiosError,
    UserWithDetailsDto | undefined
  >(['userWithDetails', userId], () => getUserWithDetails(userId || ''), {
    enabled: Boolean(userId),
    select: ({ data }) => data,
  });

  const userWithDetails = useMemo(
    () =>
      userWithDetailsQuery.data
        ? mapUserWithDetailsDtoToUserWithDetails(userWithDetailsQuery.data)
        : undefined,
    [userWithDetailsQuery.data]
  );

  return {
    userWithDetails,
    isLoading: userWithDetailsQuery.isLoading,
    isSuccess: userWithDetailsQuery.isSuccess,
    isFetched: userWithDetailsQuery.isFetched,
    fetchUserWithDetails: setUserId,
  };
}
