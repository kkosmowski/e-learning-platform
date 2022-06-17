import { ReactNode } from 'react';
import { Box, Drawer, styled, Toolbar } from '@mui/material';
import { Menu, Navbar } from './components';
import { background } from '../../colors';
import { consts } from '../../theme';

interface ApplicationLayoutProps {
  children: ReactNode;
}

export default function ApplicationLayout({
  children,
}: ApplicationLayoutProps) {
  return (
    <>
      <Navbar />

      <Drawer anchor="left" variant="permanent" open>
        <Toolbar />
        <Menu />
      </Drawer>

      <MainContainer component="main">{children}</MainContainer>
    </>
  );
}

const MainContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  paddingTop: consts.navbarHeight + 16,
  paddingLeft: consts.menuWidth + 16,
  backgroundColor: background[100],
}));
