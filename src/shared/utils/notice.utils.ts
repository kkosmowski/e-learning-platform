import {
  CreateNoticePayload,
  Notice,
  NoticeDto,
  NoticeForm,
} from 'shared/types/notice';
import { mapSubjectDtoToSubject } from './subject.utils';
import { dateStringToUTCString } from './date.utils';
import { mapUserDtoToUser } from './user.utils';

export const mapNoticeFormToCreateNoticePayload = (
  noticeForm: NoticeForm
): CreateNoticePayload => ({
  group_subject_id: noticeForm.subjectId,
  name: noticeForm.name,
  content: noticeForm.content,
  ...(noticeForm.publishInstantly
    ? {}
    : { publish_time: noticeForm.publishTime }),
});

export const mapNoticeDtoToNotice = (dto: NoticeDto): Notice => ({
  id: dto.id,
  createdBy: mapUserDtoToUser(dto.created_by),
  subject: mapSubjectDtoToSubject(dto.group_subject),
  name: dto.name,
  content: dto.content,
  createdAt: new Date(dateStringToUTCString(dto.created_at)),
  publishTime: new Date(dateStringToUTCString(dto.publish_time)),
  isPublished:
    new Date(dateStringToUTCString(dto.publish_time)).getTime() <
    new Date().getTime(),
});
