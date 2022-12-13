import {
  CreateGradeForm,
  CreateGradePayload,
  CreateProposedGrade,
  CreateProposedGradePayload,
  Grade,
  GradeDto,
  GradeType,
  VirtualGrade,
  VirtualGradeType,
} from 'shared/types/grade';
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

export const mapCreateProposedGradeToCreateProposedGradePayload = (
  form: CreateProposedGrade
): CreateProposedGradePayload => ({
  group_subject_id: form.subjectId,
  student_id: form.studentId,
  value: form.value!,
});

export const isVirtualGrade = (
  grade: Grade | VirtualGrade
): grade is VirtualGrade =>
  Object.values(VirtualGradeType).includes((grade as VirtualGrade).type);

export const fixGradeValue = (
  value: number | undefined
): number | string | undefined => {
  if (value === undefined) return undefined;
  if (value % 1 === 0) return value;

  if ((value * 10) % 1 === 0) return value.toFixed(1);
  return value.toFixed(2);
};

export const getAverageGrade = (grades: Grade[]): number => {
  const assignmentGrades = grades.filter(
    ({ type }) => type === GradeType.ASSIGNMENT
  );
  return (
    assignmentGrades.reduce((sum, { value }) => sum + value, 0) /
    assignmentGrades.length
  );
};
