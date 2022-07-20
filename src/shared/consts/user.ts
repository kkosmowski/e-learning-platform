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

export const fakeStudents: [Student, Student] = [
  {
    id: '42g4',
    firstName: 'Rose',
    lastName: 'Davis',
    fullName: 'Rose Davis',
    role: Role.Student,
    // subjectInstanceIds: [],
  },
  {
    id: '2jg9',
    firstName: 'Andrew',
    lastName: 'Bernard',
    fullName: 'Andrew Bernard',
    role: Role.Student,
    // subjectInstanceIds: [],
  },
];

export const CURRENT_USER = TEACHER;
