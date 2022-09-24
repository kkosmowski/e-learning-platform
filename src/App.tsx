import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import routes from 'routes';
import createQueryClient from 'shared/utils/create-query-client';

const queryClient = createQueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {useRoutes(routes)}
    </QueryClientProvider>
  );
}
