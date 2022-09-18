import { QueryClient } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from 'shared/consts/api';

export default function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME,
      },
    },
  });
}
