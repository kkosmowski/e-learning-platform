import { Box, Drawer, styled, Toolbar } from '@mui/material';
import { Menu, Navbar } from './components';
import { background } from 'colors';
import { consts } from 'theme';
import { Outlet } from 'react-router-dom';

export default function ApplicationLayout() {
  return (
    <>
      <Navbar />

      <Drawer anchor="left" variant="permanent" open>
        <Toolbar />
        <Menu />
      </Drawer>

      <MainContainer component="main">
        <Outlet />
      </MainContainer>
    </>
  );
}

const MainContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  paddingTop: consts.navbarHeight + consts.containerPadding,
  paddingLeft: consts.menuWidth + consts.containerPadding,
  paddingRight: consts.containerPadding,
  paddingBottom: consts.containerPadding,
  backgroundColor: background[100],
}));
