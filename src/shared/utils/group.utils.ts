import {
  CreateClassroomForm,
  CreateClassroomPayload,
} from '../types/classroom';

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
