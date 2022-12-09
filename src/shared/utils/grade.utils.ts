import {
  CreateGradeForm,
  CreateGradePayload,
  Grade,
  GradeDto,
  GradeType,
} from 'shared/types/grade';
import { SimpleSubject } from '../types/subject';
import { SimpleUserDto } from '../types/user';
import { TaskDto } from '../types/task';
import { mapSimpleSubjectDtoToSimpleSubject } from './subject.utils';
import { mapSimpleUserDtoToSimpleUser } from './user.utils';
import { mapTaskDtoToTask } from './task.utils';
import { dateStringToUTCString } from './date.utils';

export const divideGrades = (
  grades?: Grade[],
  limit?: number
): {
  assignmentGrades: Grade[];
  nonAssignmentGrades: Grade[];
} => {
  const assignmentGrades: Grade[] = [];
  const nonAssignmentGrades: Grade[] = [];

  if (grades) {
    for (const grade of grades) {
      if (
        assignmentGrades.length === limit &&
        nonAssignmentGrades.length === limit
      ) {
        break;
      }

      if (
        grade.type === GradeType.ASSIGNMENT &&
        assignmentGrades.length !== limit
      ) {
        assignmentGrades.push(grade);
      } else if (
        grade.type !== GradeType.ASSIGNMENT &&
        nonAssignmentGrades.length !== limit
      ) {
        nonAssignmentGrades.push(grade);
      }
    }
  }

  return { assignmentGrades, nonAssignmentGrades };
};

export const mapGradeDtoToGrade = (dto: GradeDto): Grade => ({
  id: dto.id,
  subject: mapSimpleSubjectDtoToSimpleSubject(dto.group_subject),
  user: mapSimpleUserDtoToSimpleUser(dto.user),
  type: dto.type,
  ...(dto.task && { task: mapTaskDtoToTask(dto.task) }),
  ...(dto.name && { name: dto.name }),
  value: dto.value,
  createdAt: new Date(dateStringToUTCString(dto.created_at)),
  createdBy: mapSimpleUserDtoToSimpleUser(dto.created_by),
});

export const mapCreateGradeFormToCreateGradePayload = (
  form: CreateGradeForm
): CreateGradePayload => ({
  group_subject_id: form.subjectId,
  student_id: form.studentId,
  type: form.type,
  ...(form.taskId && { task_id: form.taskId }),
  ...(form.name && { name: form.name }),
  value: form.value!,
});
