import {
  CreateSubjectPayload,
  SimpleSubject,
  SimpleSubjectDto,
  Subject,
  SubjectDto,
  SubjectForm,
  SubjectToUpdate,
  SubjectWithClass,
  SubjectWithClassDto,
  UpdateSubjectPayload,
} from 'shared/types/subject';
import { mapUserDtoToUser } from './user.utils';
import { mapClassDtoToClass } from './class.utils';

export const mapSubjectWithClassDtoDtoToSubjectWithClass = (
  dto: SubjectWithClassDto
): SubjectWithClass => ({
  id: dto.id,
  name: `${dto.subject.name} (${dto.group.name})`,
  category: dto.subject,
  subjectClass: mapClassDtoToClass(dto.group),
  teacher: mapUserDtoToUser(dto.teacher),
});

export const mapSubjectDtoToSubject = (dto: SubjectDto): Subject => ({
  id: dto.id,
  name: `${dto.subject.name} (${dto.group.name})`,
  category: dto.subject,
  subjectClass: dto.group,
  teacher: mapUserDtoToUser(dto.teacher),
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
  dto: SimpleSubjectDto
): SimpleSubject => ({
  id: dto.id,
  name: `${dto.subject.name} (${dto.group.name})`,
  category: dto.subject,
  subjectClass: dto.group,
});

export const mapSubjectToUpdateSubjectPayload = (
  subject: SubjectToUpdate
): UpdateSubjectPayload => ({
  id: subject.id,
  teacher_id: subject.teacher.id,
});
