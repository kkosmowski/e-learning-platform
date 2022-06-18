import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import Container from 'shared/components/Container';

export default function TaskList() {
  const navigate = useNavigate();

  const navigateHome = (): void => {
    navigate('/');
  };

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography sx={{ fontSize: 72, fontWeight: 300 }} component="h2">
        404
      </Typography>

      <Button onClick={navigateHome}>Take me home</Button>
    </Container>
  );
}
