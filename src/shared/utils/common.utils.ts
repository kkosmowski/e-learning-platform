import { AxiosError } from 'axios';

import { ErrorData } from 'shared/types/shared';
import { unknownError } from 'shared/consts/error';

export const getErrorDetail = (err: unknown): string => {
  const error = err as AxiosError;
  let apiError: string | undefined;

  if (error.response?.data) {
    apiError = (error.response.data as ErrorData).detail;
    console.log(error);
  }

  return apiError ? `error:${apiError}` : unknownError;
};
