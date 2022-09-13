import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, Button, Card, CardContent, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Close, Done } from '@mui/icons-material';

import { getUser } from 'api/user';
import { mapUserDtoToUser } from 'shared/utils/user.utils';
import { User } from 'shared/types/user';
import CommonViewLayout from 'layouts/CommonView';
import ListGridItem from 'shared/components/ListGridItem';

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
  const { t } = useTranslation('settings');

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

  return (
    <CommonViewLayout
      headerTitle={currentUser.fullName}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      {!isEditMode && (
        <Button
          variant="contained"
          sx={{ mr: 'auto' }}
          onClick={navigateToEdit}
        >
          {t('common:edit')}
        </Button>
      )}

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
    </CommonViewLayout>
  );
}
