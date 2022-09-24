import {
  Classroom,
  ClassroomDto,
  ClassroomForm,
  CreateClassroomPayload,
  UpdateClassroomPayload,
} from 'shared/types/classroom';
import { mapUserDtoToUser } from './user.utils';

export const mapClassroomFormToCreateClassroomPayload = (
  form: ClassroomForm
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

export const mapClassroomToUpdateClassroomPayload = (
  classroom: Classroom
): UpdateClassroomPayload => ({
  id: classroom.id,
  name: classroom.name,
  teacher_id: classroom.teacher.id,
  student_ids: classroom.students.map(({ id }) => id),
});

export const mapClassroomDtoToClassroom = (dto: ClassroomDto): Classroom => {
  return {
    id: dto.id,
    name: dto.name,
    teacher: mapUserDtoToUser(dto.teacher),
    students: dto.students.map(mapUserDtoToUser),
  };
};
