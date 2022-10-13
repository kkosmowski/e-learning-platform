import { ContentItem } from './shared';
import { Subject, SubjectDto } from './subject';
import { AxiosResponse } from 'axios';

export interface Notice extends ContentItem {
  publishTime: Date;
  subject: Subject;
}

export interface NoticeForm {
  subjectId: string;
  name: string;
  content: string;
}

export interface NoticeDto {
  id: string;
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
