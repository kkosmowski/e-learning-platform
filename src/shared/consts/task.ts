import { Status } from 'shared/types/shared';
import { Task, TaskSubmission, TaskType } from 'shared/types/task';
import { MEGABYTE } from './file';
import { fakeStudents, STUDENT } from './user';
import { MenuItem } from '@mui/material';
import { DAY, HOUR, HOURS_IN_A_DAY } from './date';

export const tasks: Task[] = [
  {
    id: 'nv4i',
    type: TaskType.Task,
    name: 'Monochromatic website',
    content: `You are tasked with implementing a simple web page using HTML and CSS.

The page should use a single main (primary color) as well as unrestricted range of monochromatic (gray) shades.
It would be great if the page contained various content.

Mobile view is not necessary.`,
    endTime: new Date('2022-06-20T13:59:59.000Z'),
    status: Status.Todo,
    mandatory: true,
    startTime: new Date('2022-06-19T16:44:24.000Z'),
    createdAt: new Date('2022-06-19T16:44:24.000Z'),
  },
  {
    id: 'y4ge',
    type: TaskType.Task,
    name: 'Logo of the subject',
    content: `This time a simple task of designing a logo of our subject. 

Make sure to not use too many colors, 3 should be a maximum, of course the usage of gray shades is unlimited.

Try to make a simple, flat logo.`,
    endTime: new Date('2022-06-13T19:59:59.000Z'),
    status: Status.Submitted,
    mandatory: true,
    startTime: new Date('2022-06-03T08:32:24.000Z'),
    createdAt: new Date('2022-06-03T08:32:24.000Z'),
  },
  {
    id: '24sd',
    type: TaskType.Task,
    name: 'Simple JavaScript game',
    content: `We've all played video games, but have you ever played web game? 

JS games can be made a lot of ways, but today we will make a game that uses DOM as its fundamentals.

We will be manipulating DOM in order to make the Tic-Tac-Toe game playable with just ten buttons.`,
    endTime: new Date('2022-06-06T15:59:59.000Z'),
    status: Status.Graded,
    mandatory: true,
    startTime: new Date('2022-06-06T14:00:24.000Z'),
    createdAt: new Date('2022-06-06T14:00:24.000Z'),
  },
  {
    id: 'y244',
    type: TaskType.Task,
    name: 'Simple JavaScript algorithm',
    content: `Bla bla bla`,
    endTime: new Date('2022-05-23T16:59:59.000Z'),
    status: Status.Graded,
    mandatory: true,
    startTime: new Date('2022-05-23T10:44:24.000Z'),
    createdAt: new Date('2022-05-23T10:44:24.000Z'),
  },
  {
    id: 'yh2y',
    type: TaskType.Task,
    name: 'Difficult task to do',
    content: `Bla bla bla`,
    endTime: new Date('2022-05-16T21:59:59.000Z'),
    status: Status.Graded,
    mandatory: true,
    startTime: new Date('2022-05-16T15:54:24.000Z'),
    createdAt: new Date('2022-05-16T15:54:24.000Z'),
  },
];

export const homework: Task[] = [
  {
    id: 'g43h',
    type: TaskType.Homework,
    name: '250 words about your favourite movie',
    content: `Your homework for this week is to write 250 words about your favourite movie.
The genre can be anything except documentaries. We're talking about feature films.

Make sure to add few sentences about stuff such as actors performance, music, sound, image and the plot itself.
Deadline is Sunday!`,
    endTime: new Date('2022-06-26T22:59:59.000Z'),
    status: Status.Todo,
    mandatory: false,
    startTime: new Date('2022-06-22T20:14:52.000Z'),
    createdAt: new Date('2022-06-22T20:14:52.000Z'),
  },
  {
    id: 'r12g',
    type: TaskType.Homework,
    name: 'Uninteresting homework',
    content: `Bla bla bla.`,
    endTime: new Date('2022-06-21T13:59:59.000Z'),
    status: Status.Submitted,
    mandatory: true,
    startTime: new Date('2022-06-15T07:44:52.000Z'),
    createdAt: new Date('2022-06-15T07:44:52.000Z'),
  },
  {
    id: '34tt',
    type: TaskType.Homework,
    name: 'Small web application',
    content: `Hello everyone!
Even though the name says "small" web application, this is still a bit of requiring to ask for a homework.

The app should be written in React, though if your justification will be good enough, you can use other solutions.
Your deadline is 2 weeks, which is 28th of June, noon.`,
    endTime: new Date('2022-06-28T11:59:59.000Z'),
    status: Status.Graded,
    mandatory: true,
    startTime: new Date('2022-06-14T13:45:52.000Z'),
    createdAt: new Date('2022-06-14T13:45:52.000Z'),
  },
  {
    id: 'h244',
    type: TaskType.Homework,
    name: 'Some old homework',
    content: `Bla bla bla.`,
    endTime: new Date('2022-05-30T21:59:59.000Z'),
    status: Status.Graded,
    mandatory: true,
    startTime: new Date('2022-05-23T18:23:52.000Z'),
    createdAt: new Date('2022-05-23T18:23:52.000Z'),
  },
  {
    id: 'rt32',
    type: TaskType.Homework,
    name: 'Difficult homework',
    content: `Bla bla bla.`,
    endTime: new Date('2022-05-23T21:59:59.000Z'),
    status: Status.Graded,
    mandatory: true,
    startTime: new Date('2022-05-13T11:37:52.000Z'),
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
];

export const taskSubmissions: TaskSubmission[] = [
  {
    id: '2ngo',
    taskId: 'nv4i',
    status: Status.Submitted,
    studentId: fakeStudents[0].id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: 'gm24',
    taskId: 'y4ge',
    status: Status.Submitted,
    studentId: STUDENT.id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: '1gnm',
    taskId: '24sd',
    status: Status.Graded,
    studentId: STUDENT.id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: '2g4s',
    taskId: '24sd',
    status: Status.Graded,
    studentId: fakeStudents[0].id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: '565h',
    taskId: '24sd',
    status: Status.Graded,
    studentId: fakeStudents[1].id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: 'vn56',
    taskId: 'y244',
    status: Status.Graded,
    studentId: STUDENT.id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: 'j54d',
    taskId: 'y244',
    status: Status.Graded,
    studentId: fakeStudents[0].id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: '4hjw',
    taskId: 'y244',
    status: Status.Graded,
    studentId: fakeStudents[1].id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: 'z0di',
    taskId: 'yh2y',
    status: Status.Graded,
    studentId: STUDENT.id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: '34ew',
    taskId: 'yh2y',
    status: Status.Graded,
    studentId: fakeStudents[0].id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
  {
    id: '65hj',
    taskId: 'yh2y',
    status: Status.Graded,
    studentId: fakeStudents[1].id,
    createdAt: new Date('2022-05-13T11:37:52.000Z'),
  },
];

export const TASK_MAX_MESSAGE_LENGTH = 500;
export const TASK_MAX_FILE_SIZE = 5 * MEGABYTE;
export const MIN_TASK_DURATION_IN_MINUTES = 10;
export const MAX_TASK_DURATION_IN_MINUTES = DAY;
export const DEFAULT_TASK_DURATION_IN_HOURS = 2;
export const DEFAULT_HOMEOWRK_DURATION_IN_HOURS = HOURS_IN_A_DAY;
export const VISIBLE_LATEST_TASKS = 3;

export const TASK_DURATIONS = [
  15, 30, 45, 60, 90, 240, 480, 720, 1440, 2880, 4320,
];
