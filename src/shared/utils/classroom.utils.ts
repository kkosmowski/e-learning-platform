import {
  Classroom,
  ClassroomDto,
  CreateClassroomForm,
  CreateClassroomPayload,
} from 'shared/types/classroom';
import { mapUserDtoToUser } from './user.utils';

export const mapCreateClassroomFormToPayload = (
  form: CreateClassroomForm
): CreateClassroomPayload => {
  if (form.teacher === null) {
    throw Error('Form does not contain Teacher.');
  }

  return {
    name: form.name,
    teacher_id: form.teacher.id,
    student_ids: form.students.map(({ id }) => id),
  };
};

export const mapClassroomDtoToClassroom = (dto: ClassroomDto): Classroom => ({
  id: dto.id,
  name: dto.name,
  teacher: mapUserDtoToUser(dto.teacher),
  students: dto.students.map(mapUserDtoToUser),
});
