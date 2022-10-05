import {
  Class,
  ClassDto,
  ClassForm,
  CreateClassPayload,
  UpdateClassPayload,
} from 'shared/types/class';
import { mapUserDtoToUser } from './user.utils';

export const mapClassFormToCreateClassPayload = (
  form: ClassForm
): CreateClassPayload => {
  if (form.teacher === null) {
    throw Error('Form does not contain Teacher.');
  }

  return {
    name: form.name,
    teacher_id: form.teacher.id,
    student_ids: form.students.map(({ id }) => id),
  };
};

export const mapClassToUpdateClassPayload = (
  currentClass: Class
): UpdateClassPayload => ({
  id: currentClass.id,
  name: currentClass.name,
  teacher_id: currentClass.teacher.id,
  student_ids: currentClass.students.map(({ id }) => id),
});

export const mapClassDtoToClass = (dto: ClassDto): Class => {
  return {
    id: dto.id,
    name: dto.name,
    teacher: mapUserDtoToUser(dto.teacher),
    students: dto.students.map(mapUserDtoToUser),
  };
};
