import { forwardRef } from 'react';
import { CircularProgress } from '@mui/material';

const LoadMoreIndicator = forwardRef((props, ref) => {
  return (
    <CircularProgress
      sx={{ justifySelf: 'center', alignSelf: 'center' }}
      size={24}
      ref={ref}
    />
  );
});

LoadMoreIndicator.displayName = 'LoadMoreIndicator';

export default LoadMoreIndicator;
