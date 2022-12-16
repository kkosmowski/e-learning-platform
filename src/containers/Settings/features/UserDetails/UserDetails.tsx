import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Box, Button, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { UpdateUserForm } from 'shared/types/user';
import CommonViewLayout from 'layouts/CommonView';
import { useConfirmationDialog } from 'shared/hooks';
import { useUsersQuery } from 'shared/queries';
import UserInfo from './components/UserInfo';
import UserEditForm from './components/UserEditForm';
import PageLoading from 'shared/components/PageLoading';
import { useUserWithDetailsQuery } from 'shared/queries/use-user-with-details-query';
import UserSubjectsInfo from './components/UserSubjectsInfo';

interface UserDetailsProps {
  mode: 'view' | 'edit';
}

export default function UserDetails(props: UserDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: userId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('settings');
  const { updateUser, deleteUser } = useUsersQuery();
  const {
    userWithDetails,
    isLoading,
    isSuccess,
    isFetched,
    fetchUserWithDetails,
  } = useUserWithDetailsQuery();
  const { confirmAction, confirmationDialog } = useConfirmationDialog();

  const navigateToEdit = () => {
    navigate('./edit');
  };

  useEffect(() => {
    if (userId) {
      fetchUserWithDetails(userId);
    }
  }, [fetchUserWithDetails, userId]);

  useEffect(() => {
    if (isFetched && !userWithDetails) {
      navigate('/404');
    }
  }, [isFetched, userWithDetails, navigate]);

  const showStatusToggleDialog = async () => {
    if (!userWithDetails) return;

    const shouldUpdate = await confirmAction({
      title:
        'settings:users.details.confirm.' +
        (userWithDetails.active ? 'deactivateTitle' : 'activateTitle'),
      message: {
        key:
          'settings:users.details.confirm.' +
          (userWithDetails.active ? 'deactivateMessage' : 'activateMessage'),
        props: { name: userWithDetails.fullName },
      },
      confirmLabel: userWithDetails.active
        ? 'common:deactivate'
        : 'common:activate',
      confirmColor: userWithDetails.active ? 'error' : 'primary',
    });

    if (shouldUpdate) {
      await updateUserStatus();
    }
  };

  const showDeleteDialog = async () => {
    if (!userWithDetails) return;

    const shouldDelete = await confirmAction({
      title: 'settings:users.confirm.deleteTitle',
      message: {
        key: 'settings:users.confirm.deleteMessage',
        props: { name: userWithDetails.fullName },
      },
      confirmLabel: 'common:delete',
      confirmColor: 'error',
    });

    if (shouldDelete) {
      deleteUser(userWithDetails.id);
      navigate('./..');
    }
  };

  const updateUserStatus = async () => {
    if (!userWithDetails) return;

    updateUser({
      id: userWithDetails.id,
      active: !userWithDetails.active,
      onSuccess: (updatedUser) => {
        const toastTranslationKey =
          'users.details.toast.' +
          (updatedUser.active ? 'activateSuccess' : 'deactivateSuccess');
        toast.success(t(toastTranslationKey, { name: updatedUser.fullName }));
      },
    });
  };

  const handleUserUpdate = async (userData: UpdateUserForm) => {
    if (!userWithDetails) return;

    updateUser({
      id: userWithDetails.id,
      ...userData,
      onSuccess: () => {
        toast.success(t('users.toast.updateSuccess'));
      },
    });

    navigate(-1);
  };

  return (
    <CommonViewLayout
      headerTitle={userWithDetails?.fullName || ''}
      maxWidth={1000}
      CenteredProps={{
        innerSx: {
          gap: 3,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: 'auto 1fr 1fr',
          gridTemplateAreas: '"controls controls" "generalInfo subjectsInfo"',
          alignItems: 'flex-start',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 2,
          gridArea: 'controls',
        }}
      >
        {!isEditMode && (
          <Button
            variant="contained"
            disabled={!userWithDetails}
            onClick={navigateToEdit}
          >
            {t('common:edit')}
          </Button>
        )}

        <Button
          variant="contained"
          color={userWithDetails?.active ? 'error' : 'primary'}
          disabled={!userWithDetails}
          onClick={showStatusToggleDialog}
        >
          {userWithDetails?.active
            ? t('users.details.deactivate')
            : t('users.details.activate')}
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={!userWithDetails}
          onClick={showDeleteDialog}
        >
          {t('common:delete')}
        </Button>
      </Box>

      {/*{ error && <Typography color="error.500">{ error }</Typography> }*/}

      <Card sx={{ gridArea: 'generalInfo' }}>
        <CardContent>
          {isSuccess && userWithDetails && (
            <UserInfo
              user={userWithDetails}
              {...(isEditMode && {
                fields: ['role', 'active', 'subjectClass'],
              })}
            />
          )}
          {isSuccess && userWithDetails && isEditMode && (
            <UserEditForm user={userWithDetails} onSubmit={handleUserUpdate} />
          )}
          {isLoading && <PageLoading />}
        </CardContent>
      </Card>

      {userWithDetails && <UserSubjectsInfo user={userWithDetails} />}

      {confirmationDialog}
    </CommonViewLayout>
  );
}
