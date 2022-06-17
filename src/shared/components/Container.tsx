import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';
import { SystemProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface ContainerProps extends SystemProps<Theme> {
  children: ReactNode;
  bg?: string;
  sx?: SxProps;
}

export default function Container(props: ContainerProps) {
  const { children, bg, p, sx, ...systemProps } = props;

  return (
    <Box
      sx={{
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
