import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';
import { SystemProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

import { consts } from 'theme';

interface ContainerProps extends SystemProps<Theme> {
  children: ReactNode;
  bg?: string;
  sx?: SxProps;
  scrollContainer?: boolean;
}

export interface CenteredProps extends ContainerProps {
  innerSx?: SxProps;
}

export default function Container(props: ContainerProps) {
  const { children, bg, sx, scrollContainer, ...systemProps } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...(bg && { backgroundColor: bg }),
        ...sx,
      }}
      {...(scrollContainer && { id: 'scroll-container' })}
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
