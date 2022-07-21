import { AppBar, Toolbar, Typography } from '@mui/material';
import { School } from '@mui/icons-material';

import { useAuth } from 'contexts/auth';
import { text } from 'colors';
import NavbarMenu from './NavbarMenu';
import UserToolbar from './UserToolbar';

export default function Navbar() {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, gridArea: 'navbar' }}
      elevation={0}
    >
      <Toolbar>
        <School sx={{ mr: 3 }} />

        <Typography variant="h1" component="h1" sx={{ color: text[1000] }}>
          E-learning platform
        </Typography>

        <NavbarMenu />

        <UserToolbar user={currentUser} />
      </Toolbar>
    </AppBar>
  );
}
