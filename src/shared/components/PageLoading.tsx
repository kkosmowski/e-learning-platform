import { Box, CircularProgress, SxProps } from '@mui/material';

export default function PageLoading({ sx }: { sx?: SxProps }) {
  return (
    <Box sx={{ py: 4, ...sx }}>
      <CircularProgress size={64} />
    </Box>
  );
}
