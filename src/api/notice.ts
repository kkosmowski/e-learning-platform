import { authorized } from './axios';
import {
  CreateNoticePayload,
  CreateNoticeResponse,
  GetNoticesResponse,
  GetNoticeResponse,
  UpdateNoticePayload,
  UpdateNoticeResponse,
} from 'shared/types/notice';
import { EmptyResponse } from 'shared/types/shared';

export const getSubjectNotices = (
  subjectId: string
): Promise<GetNoticesResponse> =>
  authorized((api) => api.get(`group-subject/${subjectId}/notices`));

export const getNotice = (noticeId: string): Promise<GetNoticeResponse> =>
  authorized((api) => api.get(`notice/${noticeId}`));

export const createNotice = (
  payload: CreateNoticePayload
): Promise<CreateNoticeResponse> =>
  authorized((api) => api.post('notice', payload));

export const updateNotice = ({
  id,
  ...noticeData
}: UpdateNoticePayload): Promise<UpdateNoticeResponse> =>
  authorized((api) => api.put(`notice/${id}`, noticeData));

export const publishNotice = (id: string): Promise<UpdateNoticeResponse> =>
  authorized((api) => api.post(`notice/${id}/publish`));

export const deleteNotice = (id: string): Promise<EmptyResponse> =>
  authorized((api) => api.delete(`notice/${id}`));
