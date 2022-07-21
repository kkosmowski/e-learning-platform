import { Role, User } from 'shared/types/user';

// @todo temporary

export const TEACHER: User = {
  id: '1g3j',
  active: true,
  email: 'example@example.com',
  firstName: 'John',
  lastName: 'Williams',
  fullName: 'John Williams',
  role: Role.Teacher,
  createdAt: 'today',
  lastLoginAt: 'today',
  // subjectInstanceIds: [],
};

export const STUDENT: User = {
  id: '4bng',
  active: true,
  email: 'example@example.com',
  firstName: 'Michael',
  lastName: 'Young',
  fullName: 'Michael Young',
  role: Role.Student,
  createdAt: 'today',
  lastLoginAt: 'today',
  // subjectInstanceIds: [],
};

export const fakeStudents: [User, User] = [
  {
    id: '42g4',
    active: true,
    email: 'example@example.com',
    firstName: 'Rose',
    lastName: 'Davis',
    fullName: 'Rose Davis',
    role: Role.Student,
    createdAt: 'today',
    lastLoginAt: 'today',
    // subjectInstanceIds: [],
  },
  {
    id: '2jg9',
    active: true,
    email: 'example@example.com',
    firstName: 'Andrew',
    lastName: 'Bernard',
    fullName: 'Andrew Bernard',
    role: Role.Student,
    createdAt: 'today',
    lastLoginAt: 'today',
    // subjectInstanceIds: [],
  },
];

export const CURRENT_USER = TEACHER;
