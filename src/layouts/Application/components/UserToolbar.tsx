import { useState, MouseEvent } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import { User } from 'shared/types/user';

interface UserToolbarProps {
  user: User;
  onSignOut: () => void;
}

export default function UserToolbar(props: UserToolbarProps) {
  const { user, onSignOut } = props;
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpened = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

      <IconButton
        id="user-menu-button"
        size="large"
        aria-haspopup={true}
        {...(menuOpened && {
          'aria-controls': 'user-menu',
          'aria-expanded': 'true',
        })}
        color="inherit"
        onClick={handleMenuOpen}
      >
        <AccountCircle />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={menuOpened}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button',
        }}
      >
        <MenuItem onClick={onSignOut}>{t('nav:signOut')}</MenuItem>
      </Menu>
    </Box>
  );
}
