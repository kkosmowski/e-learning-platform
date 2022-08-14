import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { background } from 'colors';
import { consts } from 'theme';
import { defaultToastDuration } from 'shared/consts/shared';
import { Navbar, Sidenav } from './components';

export default function ApplicationLayout() {
  return (
    <Wrapper>
      <Navbar />

      <Sidenav />

      <Main component="main">
        <Outlet />
      </Main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: defaultToastDuration,
          style: {
            borderRadius: 0,
          },
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => ({
  display: 'grid',
  gridTemplateAreas: `'navbar navbar' 'sidenav main'`,
  gridTemplateRows: `${consts.navbarHeight}px 1fr`,
  gridTemplateColumns: `${consts.menuWidth}px 1fr`,
  flex: 1,
  overflow: 'hidden',
}));

const Main = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden',
  backgroundColor: background[100],
  gridArea: 'main',
}));
