import { Box, Button, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box>
      <Typography sx={{ fontSize: 72 }} component="h2">
        404
      </Typography>

      <Button href="/">Take me home</Button>
    </Box>
  );
}
