import { Subject, SubjectDto } from 'shared/types/subject';
import { mapUserDtoToUser } from './user.utils';

export const mapSubjectDtoToSubject = (subjectDto: SubjectDto): Subject => ({
  id: subjectDto.id,
  category: subjectDto.subject,
  classroom: subjectDto.group,
  teacher: mapUserDtoToUser(subjectDto.teacher),
});
