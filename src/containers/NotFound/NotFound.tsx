import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Container from 'shared/components/Container';

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation('404');

  const navigateHome = (): void => {
    navigate('/');
  };

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography sx={{ fontSize: 72, fontWeight: 300 }} component="h2">
        {t('title')}
      </Typography>

      <Button onClick={navigateHome}>{t('button')}</Button>
    </Container>
  );
}
