import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Container from 'shared/components/Container';
import useCustomNavigate from 'hooks/use-custom-navigate';

export default function NotFound() {
  const { navigate } = useCustomNavigate();
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
