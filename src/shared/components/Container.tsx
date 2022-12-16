import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';
import { SystemProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

import { consts } from 'theme';

interface ContainerProps extends SystemProps<Theme> {
  children: ReactNode;
  bg?: string;
  sx?: SxProps;
}

export interface CenteredProps extends ContainerProps {
  innerSx?: SxProps;
}

export default function Container(props: ContainerProps) {
  const { children, bg, p, sx, ...systemProps } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        p: typeof p !== 'undefined' ? p : '16px 16px 64px',
        ...(bg && { backgroundColor: bg }),
        ...sx,
      }}
      {...systemProps}
    >
      {children}
    </Box>
  );
}

export function Centered(props: CenteredProps) {
  const { children, innerSx, ...containerProps } = props;
  const centeredSx = {
    width: '100%',
    maxWidth: consts.centeredLayoutMaxWidth,
    p: 0,
    ml: 'auto',
    mr: 'auto',
    overflow: 'visible',
    ...innerSx,
  };

  return (
    <Container {...containerProps}>
      <Container sx={centeredSx}>{children}</Container>
    </Container>
  );
}
