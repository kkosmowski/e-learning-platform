import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enUSLocale from 'date-fns/locale/en-US';
import plLocale from 'date-fns/locale/pl';
import { GlobalStyles } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import routes from 'routes';
import createQueryClient from 'shared/utils/create-query-client';
import i18next from './i18n/i18next';
import { PreferencesProvider } from 'contexts/preferences';
import { defaultToastDuration } from 'shared/consts/shared';

const globalStyles = (
  <GlobalStyles
    styles={{
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
    }}
  />
);

const queryClient = createQueryClient();

export default function App() {
  const locale = i18next.language === 'en' ? enUSLocale : plLocale;

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
        <PreferencesProvider>
          {useRoutes(routes)}

          {globalStyles}

          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: defaultToastDuration,
              style: {
                borderRadius: 0,
              },
            }}
          />
        </PreferencesProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
