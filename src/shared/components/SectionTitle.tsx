import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="h3"
      variant="h3"
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        mb: 2,
        '&:not(:first-of-type)': {
          mt: 6,
        },
      }}
    >
      {children}
    </Typography>
  );
}
