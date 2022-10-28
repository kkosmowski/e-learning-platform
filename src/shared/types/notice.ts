import { ContentItem } from './shared';
import { Subject, SubjectDto } from './subject';
import { AxiosResponse } from 'axios';
import { User, UserDto } from './user';

// @todo change to commented code when mocked data is no longer used
// export interface Notice extends ContentItem {
export interface Notice extends Omit<ContentItem, 'createdBy'> {
  createdBy: User; // @todo remove when no mocked data is used
  publishTime: Date;
  isPublished?: boolean;
  subject: Subject;
}

export interface NoticeForm {
  subjectId: string;
  name: string;
  content: string;
  publishInstantly: boolean;
  publishTime?: Date | null;
}

export interface NoticeDto {
  id: string;
  created_by: UserDto;
  group_subject: SubjectDto;
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

// responses

export type GetNoticesResponse = AxiosResponse<NoticeDto[]>;
export type GetNoticeResponse = AxiosResponse<NoticeDto>;
export type CreateNoticeResponse = AxiosResponse<NoticeDto>;
