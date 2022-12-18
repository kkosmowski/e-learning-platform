import { Box, styled } from '@mui/material';

const LayoutFix = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flex: 1,
  '> *': {
    flex: 1,
  },
  overflow: 'hidden',
}));

export default LayoutFix;
