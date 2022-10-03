import {
  CreateSubjectPayload,
  FullSubject,
  FullSubjectDto,
  Subject,
  SubjectDto,
  SubjectForm,
  SubjectToUpdate,
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

export const mapSubjectFormToCreatSubjectPayload = (
  formValues: SubjectForm
): CreateSubjectPayload => {
  const { category, classroom, teacher } = formValues;
  if (!category || !classroom || !teacher)
    throw new Error(
      'Missing data when mapping SubjectForm to CreateSubjectPayload.'
    );

  return {
    subject_id: category.id,
    group_id: classroom.id,
    teacher_id: teacher.id,
  };
};

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
  subject: SubjectToUpdate
): UpdateSubjectPayload => ({
  id: subject.id,
  teacher_id: subject.teacher.id,
});
