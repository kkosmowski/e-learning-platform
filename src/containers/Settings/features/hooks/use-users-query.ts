import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  GetUsersProps,
  GetUsersResponse,
  UpdateUserPayload,
  User,
  UserDto,
} from 'shared/types/user';
import {
  getUsers,
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
  const [getUsersEnabled, setGetUsersEnabled] = useState(false);
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
    if (usersQuery.data) {
      void usersQuery.refetch();
    }
  }, [getUsersProps, usersQuery]);

  const fetchUsers = (props: GetUsersProps) => {
    setGetUsersProps(props);
    setGetUsersEnabled(true);
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

  return {
    users,
    isLoading: usersQuery.isLoading,
    isSuccess: usersQuery.isSuccess,
    fetchUsers,
    updateUser,
    deleteUser,
  };
}
