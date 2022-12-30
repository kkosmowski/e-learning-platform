import {
  CreateNoticePayload,
  Notice,
  NoticeDto,
  NoticeForm,
  UpdateNoticePayload,
} from 'shared/types/notice';
import { mapSimpleSubjectDtoToSimpleSubject } from './subject.utils';
import { dateStringToUTCString } from './date.utils';
import { mapSimpleUserDtoToSimpleUser } from './user.utils';

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

export const mapNoticeFormToUpdateNoticePayload = (
  noticeId: string,
  noticeForm: NoticeForm
): UpdateNoticePayload => ({
  id: noticeId,
  name: noticeForm.name,
  content: noticeForm.content,
});

export const mapNoticeDtoToNotice = (dto: NoticeDto): Notice => ({
  id: dto.id,
  createdBy: mapSimpleUserDtoToSimpleUser(dto.created_by),
  subject: mapSimpleSubjectDtoToSimpleSubject(dto.group_subject),
  name: dto.name,
  content: dto.content,
  createdAt: new Date(dateStringToUTCString(dto.created_at)),
  publishTime: new Date(dateStringToUTCString(dto.publish_time)),
  isPublished:
    new Date(dateStringToUTCString(dto.publish_time)).getTime() <
    new Date().getTime(),
});
