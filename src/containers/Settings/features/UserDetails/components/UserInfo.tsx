import { Box, List } from '@mui/material';
import { Close, Done } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import ListGridItem from 'shared/components/ListGridItem';
import { User } from 'shared/types/user';

interface UserInfoProps {
  user: User;
  fields?: (keyof User)[];
}

export default function UserInfo(props: UserInfoProps) {
  const { user, fields } = props;
  const { t } = useTranslation('common');

  return (
    <List>
      {(!fields || fields.includes('role')) && (
        <ListGridItem label={t('userType')} value={t(user.role)} />
      )}

      {(!fields || fields.includes('active')) && (
        <ListGridItem
          label={t('status')}
          value={
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
              {user.active ? (
                <Done sx={{ color: 'success.500' }} />
              ) : (
                <Close sx={{ color: 'error.500' }} />
              )}
              {user.active ? t('active') : t('inactive')}
            </Box>
          }
        />
      )}

      {(!fields || fields.includes('email')) && (
        <ListGridItem label={t('email')} value={user.email} />
      )}

      {(!fields || fields.includes('firstName')) && (
        <ListGridItem label={t('firstName')} value={user.firstName} />
      )}

      {(!fields || fields.includes('lastName')) && (
        <ListGridItem label={t('lastName')} value={user.lastName} />
      )}
    </List>
  );
}
