import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Paper, TableContainer } from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Role, User } from 'shared/types/user';
import { useConfirmationDialog } from 'shared/hooks';
import { useUsersQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import UsersTable from './components/UsersTable';

export default function Users() {
  const { type } = useParams<{ type: 'teachers' | 'students' }>();
  const [actionMenuTarget, setActionsMenuTarget] = useState<User | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation('settings');
  const { confirmAction, confirmationDialog } = useConfirmationDialog();
  const {
    users: paginatedUsers,
    isFetching,
    isFetchingNextPage,
    isSuccess,
    hasNextUsersPage,
    fetchNextPage,
    fetchUsers,
    updateUser,
    deleteUser,
  } = useUsersQuery();
  const users = useMemo(() => paginatedUsers?.flat() || [], [paginatedUsers]);
  const currentRole = useMemo(() => getRole(type), [type]);

  const handleView = (userId: string) => {
    navigate(`/settings/user/${userId}`);
  };

  const handleEdit = () => {
    if (actionMenuTarget) {
      navigate(`/settings/user/${actionMenuTarget.id}/edit`);
    }
  };

  const updateUserStatus = async (user: User) => {
    updateUser({
      id: user.id,
      active: !user.active,
      onSuccess: (updatedUser) => {
        const toastTranslationKey =
          'users.details.toast.' +
          (updatedUser.active ? 'activateSuccess' : 'deactivateSuccess');
        toast.success(t(toastTranslationKey, { name: updatedUser.fullName }));
      },
    });
  };

  const showStatusToggleDialog = async () => {
    if (actionMenuTarget) {
      const userToUpdate = actionMenuTarget;
      setActionsMenuTarget(null);

      const shouldUpdate = await confirmAction({
        title:
          'settings:users.details.confirm.' +
          (userToUpdate.active ? 'deactivateTitle' : 'activateTitle'),
        message: {
          key:
            'settings:users.details.confirm.' +
            (userToUpdate.active ? 'deactivateMessage' : 'activateMessage'),
          props: { name: userToUpdate.fullName },
        },
        confirmLabel: userToUpdate.active
          ? 'common:deactivate'
          : 'common:activate',
        confirmColor: userToUpdate.active ? 'error' : 'primary',
      });

      if (shouldUpdate) {
        await updateUserStatus(userToUpdate);
      }
    }
  };

  const showDeleteDialog = async () => {
    if (actionMenuTarget) {
      const userToDelete = actionMenuTarget;
      setActionsMenuTarget(null);

      const shouldDelete = await confirmAction({
        title: 'settings:users.confirm.deleteTitle',
        message: {
          key: 'settings:users.confirm.deleteMessage',
          props: { name: userToDelete.fullName },
        },
        confirmLabel: 'common:delete',
        confirmColor: 'error',
      });

      if (shouldDelete) {
        deleteUser(userToDelete.id);
      }
    }
  };

  useEffect(() => {
    void fetchUsers({ role: currentRole });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRole]);

  return (
    <TableContainer
      component={Paper}
      sx={{ display: 'flex', flexDirection: 'column', flex: 1, mb: 4 }}
    >
      {!isSuccess && isFetching && <PageLoading sx={{ px: 4 }} />}
      {isSuccess ? (
        users?.length ? (
          <UsersTable
            users={users}
            target={actionMenuTarget}
            hasNextPage={hasNextUsersPage}
            isFetching={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            setTarget={setActionsMenuTarget}
            onView={handleView}
            onEdit={handleEdit}
            showStatusToggleDialog={showStatusToggleDialog}
            showDeleteDialog={showDeleteDialog}
          />
        ) : (
          t('users.noItems')
        )
      ) : null}

      {confirmationDialog}
    </TableContainer>
  );
}

const getRole = (type: 'teachers' | 'students' | undefined): Role => {
  if (type === 'teachers') return Role.Teacher;
  if (type === 'students') return Role.Student;
  throw new Error("type is neither 'teachers' nor 'students'");
};
