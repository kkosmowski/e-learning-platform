import { useEffect } from 'react';
import { AxiosError } from 'axios';

import { api } from 'api/axios';
import { getErrorDetail } from 'shared/utils/common.utils';

export default function useInterceptors(signOut: () => void) {
  useEffect(() => {
    const interceptors = api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          signOut();
        }
        throw new Error(getErrorDetail(error));
      }
    );

    return () => {
      api.interceptors.response.eject(interceptors);
    };
  }, [signOut]);
}
