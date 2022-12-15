import { Box, Stack, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { background } from 'colors';
import { defaultToastDuration } from 'shared/consts/shared';
import { Navbar } from './components';

export default function ApplicationLayout() {
  return (
    <Wrapper>
      <Navbar />

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

const Wrapper = styled(Stack)(() => ({
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
