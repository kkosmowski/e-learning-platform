import {
  FullSubject,
  FullSubjectDto,
  Subject,
  SubjectDto,
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
