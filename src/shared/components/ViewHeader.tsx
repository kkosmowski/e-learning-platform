import { ReactNode } from 'react';
import { Divider, SxProps } from '@mui/material';

import { Centered } from 'shared/components/Container';

export default function ViewHeader({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps;
}) {
  return (
    <>
      <Centered
        sx={{ flexShrink: 0 }}
        bgcolor="background.default"
        innerSx={{ flexDirection: 'row', ...sx }}
      >
        {children}
      </Centered>

      <Divider />
    </>
  );
}
