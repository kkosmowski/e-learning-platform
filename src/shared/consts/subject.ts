import { Grade, GradeType } from '../types/subject';
import { homework, tasks } from './task';

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

// @todo temporary, remove after grades are fetched from the backend
export const grades: Grade[] = [
  {
    id: '23tm',
    source: homework.find(({ id }) => id === '34tt')!,
    type: GradeType.Assignment,
    value: 5,
    createdAt: '2022-06-29T18:43:31.000Z',
  },
  {
    id: 'vj92',
    type: GradeType.Behaviour,
    value: 4,
    createdAt: '2022-06-22T11:15:44.000Z',
  },
  {
    id: 'mv42',
    source: tasks.find(({ id }) => id === '24sd')!,
    type: GradeType.Assignment,
    value: 4,
    createdAt: '2022-06-08T07:52:34.000Z',
  },
  {
    id: 'j919',
    type: GradeType.Behaviour,
    value: 5,
    createdAt: '2022-05-31T09:23:11.000Z',
  },
  {
    id: '185d',
    type: GradeType.Activity,
    value: 5,
    createdAt: '2022-05-30T10:17:21.000Z',
  },
];
