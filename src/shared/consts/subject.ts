import { User } from 'shared/types/user';
import { fakeStudents, STUDENT } from './user';

export const subjects = [
  {
    label: 'Math',
    id: 'c7e2',
  },
  {
    label: 'PE',
    id: 'm49v',
  },
  {
    label: 'English',
    id: '893s',
  },
  {
    label: 'Physics',
    id: '1mf9',
  },
  {
    label: 'Biology',
    id: 'fm93',
  },
];

export const subjectStudents: User[] = [...fakeStudents, STUDENT];
