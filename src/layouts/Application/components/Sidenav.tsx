import { Drawer } from '@mui/material';

import { Menu } from './index';

export default function Sidenav() {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{ gridArea: 'sidenav', overflow: 'hidden' }}
      PaperProps={{
        sx: {
          position: 'static',
          overflowX: 'hidden',
        },
      }}
      open
    >
      <Menu />
    </Drawer>
  );
}
