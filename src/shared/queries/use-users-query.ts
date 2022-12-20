import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  GetUserResponse,
  GetUsersProps,
  GetUsersResponse,
  UpdateUserPayload,
  User,
  UserDto,
} from 'shared/types/user';
import {
  getUsers,
  getUser,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from 'api/user';
import {
  mapPartialUserToUserDto,
  mapUserDtoToUser,
} from 'shared/utils/user.utils';
import { getErrorDetail } from 'shared/utils/common.utils';
import { usePaginatedQuery } from 'shared/hooks';
import { USER_PAGE_SIZE } from 'shared/consts/user';

export interface UpdateUserData extends Partial<User> {
  id: User['id'];
  onSuccess?: (updatedUser: User) => void;
}

type MutationFnReturnData = {
  data: UserDto;
  onSuccess: UpdateUserData['onSuccess'];
};

export function useUsersQuery() {
  const [getUsersProps, setGetUsersProps] = useState<GetUsersProps>({});
  const [getUserId, setGetUserId] = useState<string | null>(null);
  const [getUsersEnabled, setGetUsersEnabled] = useState(false);
  const [getUserEnabled, setGetUserEnabled] = useState(false);
  const { t } = useTranslation('settings');
  const queryClient = useQueryClient();
  const { getPreviousPageParam, getNextPageParam, getFetchedItemsCount } =
    usePaginatedQuery(USER_PAGE_SIZE);

  const usersQuery = useInfiniteQuery(
    [
      'users',
      getUsersProps.role || 'all',
      getUsersProps.group || getUsersProps.withoutGroups
        ? 'no-group'
        : undefined,
    ],
    async ({ pageParam = 1 }) => {
      const { data } = await getUsers(getUsersProps, pageParam);
      return data;
    },
    {
      getPreviousPageParam,
      getNextPageParam,
      enabled: getUsersEnabled,
    }
  );

  useEffect(() => {
    if (getUsersEnabled) {
      void usersQuery.refetch();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersQuery.refetch, getUsersProps, getUsersEnabled]);

  const userQuery = useQuery<GetUserResponse, AxiosError, UserDto | undefined>(
    ['user', getUserId],
    () => getUser(getUserId || ''),
    {
      enabled: Boolean(getUserId),
      select: ({ data }) => data,
    }
  );

  const fetchUsers = useCallback((props: GetUsersProps) => {
    setGetUsersProps(props);
    setGetUsersEnabled(true);
  }, []);

  const fetchUser = (userId: string) => {
    setGetUserId(userId);
    setGetUserEnabled(true);
  };

  const { mutate: updateUser } = useMutation<
    MutationFnReturnData,
    AxiosError,
    UpdateUserData
  >(
    async ({ onSuccess, ...userData }) => {
      const { data } = await updateUserApi(
        mapPartialUserToUserDto(userData) as UpdateUserPayload
      );
      return { data, onSuccess };
    },
    {
      onSuccess: ({ data, onSuccess }) => {
        queryClient.setQueryData(['users'], {
          data: usersQuery.data
            ? usersQuery.data.pages.map((page) =>
                page.items.map((user) => (user.id === data.id ? data : user))
              )
            : [],
        });
        queryClient.setQueryData(['user', data.id], { data });
        void queryClient.invalidateQueries(['userWithDetails', data.id]);
        if (onSuccess) onSuccess(mapUserDtoToUser(data));
      },
      onError: (err) => {
        const error = getErrorDetail(err);
        toast.error(t(error));
      },
    }
  );

  const { mutate: deleteUser } = useMutation<string, AxiosError, string>(
    async (userId) => {
      await deleteUserApi(userId);
      return userId;
    },
    {
      onSuccess: (deletedUserId) => {
        queryClient.setQueryData(['users'], {
          data: usersQuery.data
            ? usersQuery.data.pages.map((page) =>
                page.items.filter((user) => user.id !== deletedUserId)
              )
            : [],
        });
        void queryClient.invalidateQueries(['userWithDetails', deletedUserId]);
        void queryClient.invalidateQueries(['user', deletedUserId]);
        toast.success(t('users.deleteSuccessToast'));
      },
      onError: (err) => {
        const error = getErrorDetail(err);
        toast.error(t(error));
      },
    }
  );

  const users = useMemo(
    () =>
      usersQuery.data?.pages.map((page) => page.items.map(mapUserDtoToUser)),
    [usersQuery.data]
  );
  const currentUser = useMemo(
    () => userQuery.data && mapUserDtoToUser(userQuery.data),
    [userQuery.data]
  );

  const usersCount = useMemo(
    () => usersQuery.data?.pages[0].total_count || 0,
    [usersQuery.data]
  );

  const hasNextUsersPage = useMemo(
    () =>
      usersQuery.data &&
      getFetchedItemsCount(usersQuery.data.pages) < usersCount,
    [usersQuery.data, getFetchedItemsCount, usersCount]
  );

  const isLoading = useMemo(() => {
    if (getUsersEnabled) {
      return usersQuery.isLoading;
    } else if (getUserEnabled) {
      return userQuery.isLoading;
    }
    return false;
  }, [
    getUserEnabled,
    getUsersEnabled,
    userQuery.isLoading,
    usersQuery.isLoading,
  ]);
  const isSuccess = useMemo(() => {
    if (getUsersEnabled) {
      return usersQuery.isSuccess;
    } else if (getUserEnabled) {
      return userQuery.isSuccess;
    }
    return false;
  }, [
    getUserEnabled,
    getUsersEnabled,
    userQuery.isSuccess,
    usersQuery.isSuccess,
  ]);
  const isFetched = useMemo(() => {
    if (getUsersEnabled) {
      return usersQuery.isFetched;
    } else if (getUserEnabled) {
      return userQuery.isFetched;
    }
    return false;
  }, [
    getUserEnabled,
    getUsersEnabled,
    userQuery.isFetched,
    usersQuery.isFetched,
  ]);
  const isFetching = useMemo(() => {
    if (getUsersEnabled) {
      return usersQuery.isFetching;
    } else if (getUserEnabled) {
      return userQuery.isFetching;
    }
    return false;
  }, [
    getUserEnabled,
    getUsersEnabled,
    userQuery.isFetching,
    usersQuery.isFetching,
  ]);

  return {
    users,
    isFetchingNextPage: usersQuery.isFetchingNextPage,
    fetchNextPage: usersQuery.fetchNextPage,
    hasNextUsersPage,
    currentUser,
    isLoading,
    isSuccess,
    isFetched,
    isFetching,
    fetchUsers,
    fetchUser,
    updateUser,
    deleteUser,
  };
}
