import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';

import { text } from 'colors';
import { features } from 'shared/consts/routing';

export default function NavbarMenu() {
  const navigate = useNavigate();

  const handleButtonClick = (path?: string): void => {
    path && navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, mx: 6 }}>
      {features.map((feature) => (
        <Button
          key={feature.label}
          sx={{ color: text[1000] }}
          onClick={() => handleButtonClick(feature.path)}
        >
          {feature.label}
        </Button>
      ))}
    </Box>
  );
}