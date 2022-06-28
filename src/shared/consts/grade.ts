import { Grade, GradeType } from 'shared/types/grade';
import { homework, tasks } from './task';

export const YOUR_GRADES_VISIBLE_COUNT = 3;

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
    id: '2g33',
    source: homework.find(({ id }) => id === 'h244')!,
    type: GradeType.Assignment,
    value: 4,
    createdAt: '2022-05-31T07:55:34.000Z',
  },
  {
    id: '185d',
    type: GradeType.Activity,
    value: 5,
    createdAt: '2022-05-30T10:17:21.000Z',
  },
  {
    id: 'h35j',
    source: homework.find(({ id }) => id === 'rt32')!,
    type: GradeType.Assignment,
    value: 3,
    createdAt: '2022-05-27T17:24:34.000Z',
  },
  {
    id: 't31t',
    source: tasks.find(({ id }) => id === 'y244')!,
    type: GradeType.Assignment,
    value: 4,
    createdAt: '2022-05-25T13:52:34.000Z',
  },
  {
    id: 'h332',
    type: GradeType.Behaviour,
    value: 3,
    createdAt: '2022-05-24T09:23:11.000Z',
  },
  {
    id: 'f245',
    type: GradeType.Activity,
    value: 4,
    createdAt: '2022-05-22T10:17:21.000Z',
  },
  {
    id: '353h',
    source: tasks.find(({ id }) => id === 'yh2y')!,
    type: GradeType.Assignment,
    value: 5,
    createdAt: '2022-05-19T16:46:34.000Z',
  },
];
