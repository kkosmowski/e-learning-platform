import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Close, Done } from '@mui/icons-material';

import { getUser, updateUser } from 'api/user';
import {
  mapUserDtoToUser,
  mapPartialUserToUserDto,
} from 'shared/utils/user.utils';
import { UpdateUserPayload, User } from 'shared/types/user';
import CommonViewLayout from 'layouts/CommonView';
import ListGridItem from 'shared/components/ListGridItem';
import { getErrorDetail } from 'shared/utils/common.utils';
import { useConfirmationDialog } from '../../../../shared/hooks';
import toast from 'react-hot-toast';

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

  const toggleStatus = async () => {
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

  const updateUserStatus = async () => {
    try {
      const payload = mapPartialUserToUserDto({
        id: currentUser.id,
        active: !currentUser.active,
      }) as UpdateUserPayload;

      const { data: updatedUserDto } = await updateUser(payload);
      setCurrentUser(mapUserDtoToUser(updatedUserDto));
      const toastTranslationKey =
        'users.details.' +
        (currentUser.active
          ? 'deactivateSuccessToast'
          : 'activateSuccessToast');
      toast.success(t(toastTranslationKey, { name: currentUser.fullName }));
    } catch (err: unknown) {
      const error = getErrorDetail(err);
      setError(t(error));
      toast.error(t(error));
    }
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
          onClick={toggleStatus}
        >
          {currentUser.active
            ? t('users.details.deactivate')
            : t('users.details.activate')}
        </Button>
      </Box>

      {error && <Typography color="error.500">{error}</Typography>}

      <Card>
        <CardContent>
          <List>
            <ListGridItem
              label={t('common:userType')}
              value={t(`common:${currentUser.role}`)}
            />

            <ListGridItem
              label={t('common:status')}
              value={
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
                  {currentUser.active ? (
                    <Done sx={{ color: 'success.500' }} />
                  ) : (
                    <Close sx={{ color: 'error.500' }} />
                  )}
                  {currentUser.active
                    ? t('common:active')
                    : t('common:inactive')}
                </Box>
              }
            />

            <ListGridItem
              label={t('common:firstName')}
              value={currentUser.firstName}
            />

            <ListGridItem
              label={t('common:lastName')}
              value={currentUser.lastName}
            />

            <ListGridItem label={t('common:email')} value={currentUser.email} />
          </List>
        </CardContent>
      </Card>

      {confirmationDialog}
    </CommonViewLayout>
  );
}
