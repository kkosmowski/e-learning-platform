import { authorized } from './axios';
import { CreateNoticePayload, CreateNoticeResponse } from 'shared/types/notice';

export const createNotice = (
  payload: CreateNoticePayload
): Promise<CreateNoticeResponse> =>
  authorized((api) => api.post('notice', payload));
