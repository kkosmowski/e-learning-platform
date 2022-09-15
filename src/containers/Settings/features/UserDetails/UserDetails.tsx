import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { deleteUser, getUser } from 'api/user';
import { mapUserDtoToUser } from 'shared/utils/user.utils';
import { UpdateUserForm, User } from 'shared/types/user';
import CommonViewLayout from 'layouts/CommonView';
import { useConfirmationDialog } from 'shared/hooks';
import UserInfo from './components/UserInfo';
import UserEditForm from './components/UserEditForm';
import useUpdateUserData from '../../hooks/use-update-user-data';

interface UserDetailsProps {
  mode: 'view' | 'edit';
}

export default function UserDetails(props: UserDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: userId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [error, setError] = useState('');
  const { t } = useTranslation('settings');
  const updateUserData = useUpdateUserData();

  const { confirmAction, confirmationDialog } = useConfirmationDialog();

  const fetchUser = useCallback(async (userId: string) => {
    try {
      const { data: user } = await getUser(userId);
      setCurrentUser(mapUserDtoToUser(user));
    } catch (error) {
      setCurrentUser(null);
    }
  }, []);

  const navigateToEdit = () => {
    navigate('./edit', { replace: false });
  };

  useEffect(() => {
    if (userId) {
      void fetchUser(userId);
    }
  }, [fetchUser, userId]);

  if (currentUser === null) {
    navigate('/404');
    return null;
  } else if (currentUser === undefined) {
    return null;
  }

  const showStatusToggleDialog = async () => {
    const shouldUpdate = await confirmAction({
      title:
        'settings:users.details.' +
        (currentUser.active
          ? 'confirmDeactivateTitle'
          : 'confirmActivateTitle'),
      message: {
        key:
          'settings:users.details.' +
          (currentUser.active
            ? 'confirmDeactivateMessage'
            : 'confirmActivateMessage'),
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
    const shouldDelete = await confirmAction({
      title: 'settings:users.confirmDeleteTitle',
      message: {
        key: 'settings:users.confirmDeleteMessage',
        props: { name: currentUser.fullName },
      },
      confirmLabel: 'common:delete',
      confirmColor: 'error',
    });

    if (shouldDelete) {
      await handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(currentUser.id);
      toast.success(t('settings:users.deleteSuccessToast'));
    } catch (e) {
      console.error(e);
    }
  };

  const updateUserStatus = async () => {
    await updateUserData({
      id: currentUser.id,
      userData: { active: !currentUser.active },
      onSuccess: (user) => {
        setCurrentUser(user);
        setError('');

        const toastTranslationKey =
          'users.details.' +
          (currentUser.active
            ? 'deactivateSuccessToast'
            : 'activateSuccessToast');
        toast.success(t(toastTranslationKey, { name: currentUser.fullName }));
      },
      onError: (error) => {
        setError(t(error));
        toast.error(t(error));
      },
    });
  };

  const handleUserUpdate = async (userData: UpdateUserForm) => {
    await updateUserData({
      id: currentUser.id,
      userData,
      onSuccess: (user) => {
        navigate('..');
        setCurrentUser(user);
        toast.success(t('settings:users.updateUser.success'));
      },
      onError: (error) => {
        setError(t(error));
        toast.error(t(error));
      },
    });
  };

  return (
    <CommonViewLayout
      headerTitle={currentUser.fullName}
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
          <Button variant="contained" onClick={navigateToEdit}>
            {t('common:edit')}
          </Button>
        )}

        <Button
          variant="contained"
          color={currentUser.active ? 'error' : 'primary'}
          onClick={showStatusToggleDialog}
        >
          {currentUser.active
            ? t('users.details.deactivate')
            : t('users.details.activate')}
        </Button>

        <Button variant="contained" color="error" onClick={showDeleteDialog}>
          {t('common:delete')}
        </Button>
      </Box>

      {error && <Typography color="error.500">{error}</Typography>}

      <Card>
        <CardContent>
          <UserInfo
            user={currentUser}
            {...(isEditMode && { fields: ['role', 'active'] })}
          />
          {isEditMode && (
            <UserEditForm user={currentUser} onSubmit={handleUserUpdate} />
          )}
        </CardContent>
      </Card>

      {confirmationDialog}
    </CommonViewLayout>
  );
}
