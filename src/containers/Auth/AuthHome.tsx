import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'contexts/auth';
import { primary, text } from 'colors';
import AuthWrapper from './AuthWrapper';

export default function AuthHome() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          backgroundColor: primary[500],
          color: text[1000],
        }}
      ></Box>

      <AuthWrapper>
        <Outlet />
      </AuthWrapper>
    </Box>
  );
}
