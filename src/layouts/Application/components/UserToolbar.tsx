import { Box, IconButton, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { Student, Teacher } from 'shared/types/user';

interface UserToolbarProps {
  user: Teacher | Student;
}

export default function UserToolbar(props: UserToolbarProps) {
  const { user } = props;
  const { t } = useTranslation('common');

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <Typography component="span" variant="body2">
        {t('welcome')}{' '}
        <Typography
          component="strong"
          variant="body2"
          sx={{ fontWeight: 'bold' }}
        >
          {user.firstName}
        </Typography>
      </Typography>

      <IconButton size="large">
        <AccountCircle />
      </IconButton>
    </Box>
  );
}
