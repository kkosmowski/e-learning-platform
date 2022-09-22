import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Paper, TableContainer } from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { Role, User } from 'shared/types/user';
import { useConfirmationDialog } from 'shared/hooks';
import PageLoading from 'shared/components/PageLoading';
import useUsersQuery from '../hooks/use-users-query';
import UsersTable from './components/UsersTable';

export default function Users() {
  const { type } = useParams<{ type: 'teachers' | 'students' }>();
  const [actionMenuTarget, setActionsMenuTarget] = useState<User | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { confirmAction, confirmationDialog } = useConfirmationDialog();
  const { users, isLoading, isSuccess, fetchUsers, updateUser, deleteUser } =
    useUsersQuery();
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
          'users.details.' +
          (updatedUser.active
            ? 'activateSuccessToast'
            : 'deactivateSuccessToast');
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
          'settings:users.details.' +
          (userToUpdate.active
            ? 'confirmDeactivateTitle'
            : 'confirmActivateTitle'),
        message: {
          key:
            'settings:users.details.' +
            (userToUpdate.active
              ? 'confirmDeactivateMessage'
              : 'confirmActivateMessage'),
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
        title: 'settings:users.confirmDeleteTitle',
        message: {
          key: 'settings:users.confirmDeleteMessage',
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
    console.log('what', currentRole);
    void fetchUsers({ role: currentRole });
  }, [currentRole]);

  return (
    <TableContainer component={Paper}>
      {isLoading && <PageLoading />}
      {isSuccess && users?.length ? (
        <UsersTable
          users={users}
          target={actionMenuTarget}
          setTarget={setActionsMenuTarget}
          onView={handleView}
          onEdit={handleEdit}
          showStatusToggleDialog={showStatusToggleDialog}
          showDeleteDialog={showDeleteDialog}
        />
      ) : (
        t('settings:users.noItems')
      )}

      {confirmationDialog}
    </TableContainer>
  );
}

const getRole = (type: 'teachers' | 'students' | undefined): Role => {
  if (type === 'teachers') return Role.Teacher;
  if (type === 'students') return Role.Student;
  throw new Error("type is neither 'teachers' nor 'students'");
};
