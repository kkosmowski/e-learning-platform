import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';
import { SystemProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface ContainerProps extends SystemProps<Theme> {
  children: ReactNode;
  bg?: string;
  sx?: SxProps;
}

interface CenteredProps extends ContainerProps {
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
        p: typeof p !== 'undefined' ? p : 2,
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
    maxWidth: 1000,
    padding: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'visible',
    ...innerSx,
  };

  return (
    <Container {...containerProps}>
      <Container sx={centeredSx}>{children}</Container>
    </Container>
  );
}
