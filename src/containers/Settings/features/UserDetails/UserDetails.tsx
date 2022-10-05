import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Box, Button, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { UpdateUserForm } from 'shared/types/user';
import CommonViewLayout from 'layouts/CommonView';
import { useConfirmationDialog, useUsersQuery } from 'shared/hooks';
import UserInfo from './components/UserInfo';
import UserEditForm from './components/UserEditForm';
import PageLoading from 'shared/components/PageLoading';
import useCustomNavigate from 'hooks/use-custom-navigate';

interface UserDetailsProps {
  mode: 'view' | 'edit';
}

export default function UserDetails(props: UserDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: userId } = useParams<{ id: string }>();
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('settings');
  const {
    currentUser,
    isLoading,
    isSuccess,
    isFetched,
    fetchUser,
    updateUser,
    deleteUser,
  } = useUsersQuery();
  const { confirmAction, confirmationDialog } = useConfirmationDialog();

  const navigateToEdit = () => {
    navigate('./edit');
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [fetchUser, userId]);

  useEffect(() => {
    if (isFetched && !currentUser) {
      navigate('/404');
    }
  }, [isFetched, currentUser, navigate]);

  const showStatusToggleDialog = async () => {
    if (!currentUser) return;

    const shouldUpdate = await confirmAction({
      title:
        'settings:users.details.confirm.' +
        (currentUser.active ? 'deactivateTitle' : 'activateTitle'),
      message: {
        key:
          'settings:users.details.confirm.' +
          (currentUser.active ? 'deactivateMessage' : 'activateMessage'),
        props: { name: currentUser.fullName },
      },
      confirmLabel: currentUser.active
        ? 'common:deactivate'
        : 'common:activate',
      confirmColor: currentUser.active ? 'error' : 'primary',
    });

    if (shouldUpdate) {
      await updateUserStatus();
    }
  };

  const showDeleteDialog = async () => {
    if (!currentUser) return;

    const shouldDelete = await confirmAction({
      title: 'settings:users.confirm.deleteTitle',
      message: {
        key: 'settings:users.confirm.deleteMessage',
        props: { name: currentUser.fullName },
      },
      confirmLabel: 'common:delete',
      confirmColor: 'error',
    });

    if (shouldDelete) {
      deleteUser(currentUser.id);
      navigate('./..');
    }
  };

  const updateUserStatus = async () => {
    if (!currentUser) return;

    updateUser({
      id: currentUser.id,
      active: !currentUser.active,
      onSuccess: (updatedUser) => {
        const toastTranslationKey =
          'users.details.toast.' +
          (updatedUser.active ? 'activateSuccess' : 'deactivateSuccess');
        toast.success(t(toastTranslationKey, { name: updatedUser.fullName }));
      },
    });
  };

  const handleUserUpdate = async (userData: UpdateUserForm) => {
    if (!currentUser) return;

    updateUser({
      id: currentUser.id,
      ...userData,
      onSuccess: () => {
        toast.success(t('users.toast.updateSuccess'));
      },
    });
  };

  return (
    <CommonViewLayout
      headerTitle={currentUser?.fullName || ''}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 2,
        }}
      >
        {!isEditMode && (
          <Button
            variant="contained"
            disabled={!currentUser}
            onClick={navigateToEdit}
          >
            {t('common:edit')}
          </Button>
        )}

        <Button
          variant="contained"
          color={currentUser?.active ? 'error' : 'primary'}
          disabled={!currentUser}
          onClick={showStatusToggleDialog}
        >
          {currentUser?.active
            ? t('users.details.deactivate')
            : t('users.details.activate')}
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={!currentUser}
          onClick={showDeleteDialog}
        >
          {t('common:delete')}
        </Button>
      </Box>

      {/*{ error && <Typography color="error.500">{ error }</Typography> }*/}

      <Card>
        <CardContent>
          {isSuccess && currentUser && (
            <UserInfo
              user={currentUser}
              {...(isEditMode && { fields: ['role', 'active'] })}
            />
          )}
          {isSuccess && currentUser && isEditMode && (
            <UserEditForm user={currentUser} onSubmit={handleUserUpdate} />
          )}
          {isLoading && <PageLoading />}
        </CardContent>
      </Card>

      {confirmationDialog}
    </CommonViewLayout>
  );
}
