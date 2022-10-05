import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { text } from 'colors';
import { useAuth } from 'contexts/auth';
import { features } from 'shared/consts/routing';
import { isUserPermitted } from 'shared/utils/user.utils';
import useCustomNavigate from 'hooks/use-custom-navigate';

export default function NavbarMenu() {
  const { navigate } = useCustomNavigate();
  const { currentUser } = useAuth();
  const { t } = useTranslation('nav');

  const handleButtonClick = (path?: string): void => {
    path && navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, mx: 6 }}>
      {features
        .filter((feature) => isUserPermitted(currentUser, feature.limitedTo))
        .map((feature) => (
          <Button
            key={feature.id}
            sx={{ color: text[1000] }}
            onClick={() => handleButtonClick(feature.path)}
          >
            {t(`button.${feature.id}`)}
          </Button>
        ))}
    </Box>
  );
}
