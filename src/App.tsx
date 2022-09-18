import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import routes from 'routes';
import createQueryClient from 'shared/utils/create-query-client';

export default function App() {
  const queryClient = createQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {useRoutes(routes)}
    </QueryClientProvider>
  );
}
