import {
  FullSubject,
  FullSubjectDto,
  Subject,
  SubjectDto,
  SubjectForm,
  UpdateSubjectPayload,
} from 'shared/types/subject';
import { mapUserDtoToUser } from './user.utils';
import { mapClassroomDtoToClassroom } from './classroom.utils';

export const mapSubjectDtoToSubject = (subjectDto: SubjectDto): Subject => ({
  id: subjectDto.id,
  name: `${subjectDto.subject.name} (${subjectDto.group.name})`,
  category: subjectDto.subject,
  classroom: subjectDto.group,
  teacher: mapUserDtoToUser(subjectDto.teacher),
});

export const mapFullSubjectDtoToFullSubject = (
  subjectDto: FullSubjectDto
): FullSubject => ({
  id: subjectDto.id,
  name: `${subjectDto.subject.name} (${subjectDto.group.name})`,
  category: subjectDto.subject,
  classroom: mapClassroomDtoToClassroom(subjectDto.group),
  teacher: mapUserDtoToUser(subjectDto.teacher),
});

export const mapSubjectToUpdateSubjectPayload = (
  subject: Subject
): UpdateSubjectPayload => ({
  id: subject.id,
  subject_id: subject.category.id,
  group_id: subject.classroom.id,
  teacher_id: subject.teacher.id,
});
