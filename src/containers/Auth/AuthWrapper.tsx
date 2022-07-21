import { Box, Card, CardContent } from '@mui/material';
import { ReactNode } from 'react';

import { background } from 'colors';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper(props: AuthWrapperProps) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: background[200],
      }}
    >
      <Card sx={{ width: 320 }}>
        <CardContent sx={{ '&&': { py: 4, px: 3 } }}>{children}</CardContent>
      </Card>
    </Box>
  );
}
