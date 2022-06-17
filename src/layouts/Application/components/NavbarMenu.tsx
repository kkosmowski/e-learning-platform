import { Box, Button } from '@mui/material';
import { text } from 'colors';

export default function NavbarMenu() {
  const pages = ['Home', 'Subjects', 'Profile', 'Settings'];

  const handleButtonClick = (page: string): void => {
    switch (page) {
      case 'Home': {
        break;
      }

      case 'Subjects': {
        break;
      }

      case 'Profile': {
        break;
      }

      case 'Settings': {
        break;
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, mx: 6 }}>
      {pages.map((page) => (
        <Button
          key={page}
          sx={{ color: text[1000] }}
          onClick={() => handleButtonClick(page)}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
}
