import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Typography component="h3" variant="h3" mb={2}>
      {children}
    </Typography>
  );
}
