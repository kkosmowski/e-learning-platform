import { Role, Student, Teacher } from 'shared/types/user';

// @todo temporary

export const TEACHER: Teacher = {
  id: '1g3j',
  firstName: 'John',
  lastName: 'Williams',
  fullName: 'John Williams',
  role: Role.Teacher,
  // subjectInstanceIds: [],
};

export const STUDENT: Student = {
  id: '4bng',
  firstName: 'Michael',
  lastName: 'Young',
  fullName: 'Michael Young',
  role: Role.Student,
  // subjectInstanceIds: [],
};

export const CURRENT_USER = TEACHER;
