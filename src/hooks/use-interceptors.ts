import { useEffect } from 'react';
import { AxiosError } from 'axios';

import { api } from 'api/axios';

export default function useInterceptors(signOut: () => void) {
  useEffect(() => {
    const interceptors = api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          signOut();
        }
      }
    );

    return () => {
      api.interceptors.response.eject(interceptors);
    };
  }, [signOut]);
}
