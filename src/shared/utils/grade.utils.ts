import { Grade } from 'shared/types/grade';

export const divideGrades = (
  grades: Grade[],
  limit?: number
): {
  assignmentGrades: Grade[];
  nonAssignmentGrades: Grade[];
} => {
  const assignmentGrades: Grade[] = [];
  const nonAssignmentGrades: Grade[] = [];

  for (const grade of grades) {
    if (
      assignmentGrades.length === limit &&
      nonAssignmentGrades.length === limit
    ) {
      break;
    }

    if (grade.source && assignmentGrades.length !== limit) {
      assignmentGrades.push(grade);
    } else if (nonAssignmentGrades.length !== limit) {
      nonAssignmentGrades.push(grade);
    }
  }

  return { assignmentGrades, nonAssignmentGrades };
};
