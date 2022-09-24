import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export interface UpdateUserData extends Partial<User> {
  id: User['id'];
  onSuccess?: (updatedUser: User) => void;
}

type MutationFnReturnData = {
  data: UserDto;
  onSuccess: UpdateUserData['onSuccess'];
};

export default function useUsersQuery() {
  const [getUsersProps, setGetUsersProps] = useState<GetUsersProps>({});
  const [getUserId, setGetUserId] = useState<string | null>(null);
  const [getUsersEnabled, setGetUsersEnabled] = useState(false);
  const [getUserEnabled, setGetUserEnabled] = useState(false);
  const { t } = useTranslation('settings');
  const queryClient = useQueryClient();

  const usersQuery = useQuery<GetUsersResponse, AxiosError, UserDto[]>(
    ['users'],
    () => getUsers(getUsersProps),
    {
      enabled: getUsersEnabled,
      select: ({ data }) => data,
    }
  );

  useEffect(() => {
    if (getUsersEnabled) {
      void usersQuery.refetch();
    }
  }, [usersQuery.refetch, getUsersProps, getUsersEnabled]);

  const userQuery = useQuery<GetUserResponse, AxiosError, UserDto | undefined>(
    ['user', getUserId],
    () => getUser(getUserId || ''),
    {
      enabled: Boolean(getUserId),
      select: ({ data }) => data,
    }
  );

  const fetchUsers = (props: GetUsersProps) => {
    setGetUsersProps(props);
    setGetUsersEnabled(true);
  };

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
            ? usersQuery.data.map((user) => (user.id === data.id ? data : user))
            : [],
        });
        queryClient.setQueryData(['user', data.id], {
          data: userQuery.data ? data : undefined,
        });
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
            ? usersQuery.data.filter((user) => user.id !== deletedUserId)
            : [],
        });
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
    () => usersQuery.data?.map(mapUserDtoToUser),
    [usersQuery.data]
  );
  const currentUser = useMemo(
    () => userQuery.data && mapUserDtoToUser(userQuery.data),
    [userQuery.data]
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

  return {
    users,
    currentUser,
    isLoading,
    isSuccess,
    isFetched,
    fetchUsers,
    fetchUser,
    updateUser,
    deleteUser,
  };
}
