import { Drawer } from '@mui/material';

import { Menu } from './index';

export default function Sidenav() {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{ gridArea: 'sidenav' }}
      PaperProps={{
        sx: { position: 'static' },
      }}
      open
    >
      <Menu />
    </Drawer>
  );
}
