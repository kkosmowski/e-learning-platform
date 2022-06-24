import { Grade } from '../types/subject';
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
    id: 'mv42',
    source: tasks.find(({ id }) => id === '24sd')!,
    value: 4,
  },
  {
    id: '23tm',
    source: homework.find(({ id }) => id === '34tt')!,
    value: 5,
  },
];
