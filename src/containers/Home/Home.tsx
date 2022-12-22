import { Box } from '@mui/material';

import HomeSidenav from 'containers/HomeSidenav';
import LayoutFix from 'layouts/LayoutFix';
import CommonViewLayout from 'layouts/CommonView';

export default function Home() {
  return (
    <LayoutFix>
      <HomeSidenav />

      <CommonViewLayout>
        <Box>Place for announcements...</Box>
      </CommonViewLayout>
    </LayoutFix>
  );
}
