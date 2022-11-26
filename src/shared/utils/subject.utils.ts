import {
  CreateSubjectPayload,
  SimpleSubject,
  SimpleSubjectDto,
  Subject,
  SubjectDto,
  SubjectForm,
  SubjectToUpdate,
  UpdateSubjectPayload,
} from 'shared/types/subject';
import { mapUserDtoToUser } from './user.utils';
import { mapClassDtoToClass } from './class.utils';

export const mapSubjectDtoToSubject = (subjectDto: SubjectDto): Subject => ({
  id: subjectDto.id,
  name: `${subjectDto.subject.name} (${subjectDto.group.name})`,
  category: subjectDto.subject,
  subjectClass: mapClassDtoToClass(subjectDto.group),
  teacher: mapUserDtoToUser(subjectDto.teacher),
});

export const mapSubjectFormToCreatSubjectPayload = (
  formValues: SubjectForm
): CreateSubjectPayload => {
  const { category, subjectClass, teacher } = formValues;
  if (!category || !subjectClass || !teacher)
    throw new Error(
      'Missing data when mapping SubjectForm to CreateSubjectPayload.'
    );

  return {
    subject_id: category.id,
    group_id: subjectClass.id,
    teacher_id: teacher.id,
  };
};

export const mapSimpleSubjectDtoToSimpleSubject = (
  subjectDto: SimpleSubjectDto
): SimpleSubject => ({
  id: subjectDto.id,
  name: `${subjectDto.subject.name} (${subjectDto.group.name})`,
  category: subjectDto.subject,
  subjectClass: subjectDto.group,
});

export const mapSubjectToUpdateSubjectPayload = (
  subject: SubjectToUpdate
): UpdateSubjectPayload => ({
  id: subject.id,
  teacher_id: subject.teacher.id,
});
