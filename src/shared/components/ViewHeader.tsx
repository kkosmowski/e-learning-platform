import { ReactNode } from 'react';
import { Divider, SxProps } from '@mui/material';

import { Centered } from 'shared/components/Container';

export default function ViewHeader({
  children,
  height,
  sx,
}: {
  children: ReactNode;
  height?: string | number;
  sx?: SxProps;
}) {
  return (
    <>
      <Centered
        sx={{
          flexShrink: 0,
          height: height || 56,
          py: 0,
          px: 2,
          justifyContent: 'center',
        }}
        bgcolor="background.default"
        innerSx={{
          flexDirection: 'row',
          ...sx,
        }}
      >
        {children}
      </Centered>

      <Divider />
    </>
  );
}
