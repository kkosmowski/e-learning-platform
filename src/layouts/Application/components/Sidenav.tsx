import { Drawer, SxProps } from '@mui/material';
import { ReactNode } from 'react';

import { consts } from 'theme';

interface SidenavProps {
  children: ReactNode;
  sx?: SxProps;
}

export default function Sidenav(props: SidenavProps) {
  const { children, sx } = props;
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        overflow: 'hidden',
        '&&': {
          flex: `0 0 ${consts.menuWidth}px`,
        },
      }}
      PaperProps={{
        sx: {
          position: 'static',
          overflowX: 'hidden',
          p: 2,
          ...sx,
        },
      }}
      open
    >
      {children}
    </Drawer>
  );
}
