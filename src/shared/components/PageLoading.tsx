import { Box, CircularProgress, SxProps } from '@mui/material';

export default function PageLoading({
  sx,
  px,
}: {
  sx?: SxProps;
  px?: boolean;
}) {
  return (
    <Box sx={{ py: 4, px: px ? 4 : 0, ...sx }}>
      <CircularProgress size={64} />
    </Box>
  );
}
