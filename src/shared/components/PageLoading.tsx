import { Box, CircularProgress } from '@mui/material';

export default function PageLoading() {
  return (
    <Box sx={{ py: 4 }}>
      <CircularProgress size={64} />
    </Box>
  );
}
