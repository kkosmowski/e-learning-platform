import { AxiosError } from 'axios';

import { ErrorData } from 'shared/types/shared';
import { unknownError } from 'shared/consts/error';

export const getErrorDetail = (err: unknown): string => {
  const error = err as AxiosError;
  let errorDetail = unknownError;

  if (error.response?.data) {
    errorDetail = (error.response.data as ErrorData).detail || unknownError;
  }

  return `error:${errorDetail}`;
};
