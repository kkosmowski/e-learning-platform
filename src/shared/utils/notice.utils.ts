import {
  CreateNoticePayload,
  Notice,
  NoticeDto,
  NoticeForm,
} from 'shared/types/notice';
import { mapSubjectDtoToSubject } from './subject.utils';

export const mapNoticeFormToCreateNoticePayload = (
  form: NoticeForm
): CreateNoticePayload => ({
  group_subject_id: form.subjectId,
  name: form.name,
  content: form.content,
});

export const mapNoticeDtoToNotice = (dto: NoticeDto): Notice => ({
  id: dto.id,
  subject: mapSubjectDtoToSubject(dto.group_subject),
  name: dto.name,
  content: dto.content,
  createdAt: new Date(dto.created_at),
  publishTime: new Date(dto.publish_time),
});
