import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SxProps, Typography } from '@mui/material';

import { primary } from 'colors';

interface StyledLinkProps {
  children: ReactNode;
  to: string;
  hoverUnderline?: boolean;
  sx?: SxProps;
}

export default function StyledLink(props: StyledLinkProps) {
  const { to, children, hoverUnderline = true, sx } = props;
  return (
    <Typography
      component={Link}
      to={to}
      sx={{
        textDecoration: 'none',
        ':hover': {
          ...(hoverUnderline && { textDecoration: 'underline' }),
          color: primary[500],
        },
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
