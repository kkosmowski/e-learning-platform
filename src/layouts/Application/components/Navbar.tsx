import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { AccountCircle, School } from '@mui/icons-material';
import NavbarMenu from './NavbarMenu';

export default function Navbar() {
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <School sx={{ mr: 3 }} />
        <Typography variant="h1" component="h1">
          E-learning platform
        </Typography>

        <NavbarMenu />

        <IconButton size="large">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
