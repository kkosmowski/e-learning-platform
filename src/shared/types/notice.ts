import { AxiosResponse } from 'axios';

import { ContentItem } from './shared';
import { SimpleSubject, SimpleSubjectDto } from './subject';
import { SimpleUserDto } from './user';

export interface Notice extends ContentItem {
  publishTime: Date;
  isPublished: boolean;
  subject: SimpleSubject;
}

export interface NoticeForm {
  subjectId: string;
  name: string;
  content: string;
  publishInstantly: boolean;
  publishTime?: Date | null;
  isPublished?: boolean;
}

export interface NoticeDto {
  id: string;
  created_by: SimpleUserDto;
  group_subject: SimpleSubjectDto;
  name: string;
  content: string;
  created_at: string;
  publish_time: string;
}

// payloads

export interface CreateNoticePayload {
  group_subject_id: string;
  name: string;
  content: string;
}

export interface UpdateNoticePayload {
  id: string;
  name: string;
  content: string;
}

// responses

export type GetNoticesResponse = AxiosResponse<NoticeDto[]>;
export type GetNoticeResponse = AxiosResponse<NoticeDto>;
export type CreateNoticeResponse = AxiosResponse<NoticeDto>;
export type UpdateNoticeResponse = AxiosResponse<NoticeDto>;
