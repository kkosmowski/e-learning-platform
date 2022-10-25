import { authorized } from './axios';
import {
  CreateNoticePayload,
  CreateNoticeResponse,
  GetNoticesResponse,
} from 'shared/types/notice';

export const getNotices = (subjectId: string): Promise<GetNoticesResponse> =>
  authorized((api) => api.get(`notice/${subjectId}`));

export const createNotice = (
  payload: CreateNoticePayload
): Promise<CreateNoticeResponse> =>
  authorized((api) => api.post('notice', payload));
