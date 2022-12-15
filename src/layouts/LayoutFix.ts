import { Box, styled } from '@mui/material';

export const LayoutFix = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flex: 1,
  '> *': {
    flex: 1,
  },
}));
