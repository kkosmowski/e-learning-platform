import { Task, TaskStatus } from 'shared/types/task';
import { MEGABYTE } from './file';

export const tasks: Task[] = [
  {
    id: 'nv4i',
    title: 'Monochromatic website',
    content: `You are tasked with implementing a simple web page using HTML and CSS.

The page should use a single main (primary color) as well as unrestricted range of monochromatic (gray) shades.
It would be great if the page contained various content.

Mobile view is not necessary.`,
    deadline: '2022-06-20T13:59:59.000Z',
    status: TaskStatus.Todo,
  },
  {
    id: 'y4ge',
    title: 'Logo of the subject',
    content: `This time a simple task of designing a logo of our subject. 

Make sure to not use too many colors, 3 should be a maximum, of course the usage of gray shades is unlimited.

Try to make a simple, flat logo.`,
    deadline: '2022-06-13T13:59:59.000Z',
    status: TaskStatus.Submitted,
  },
  {
    id: '24sd',
    title: 'Simple JavaScript game',
    content: `We've all played video games, but have you ever played web game? 

JS games can be made a lot of ways, but today we will make a game that uses DOM as its fundamentals.

We will be manipulating DOM in order to make the Tic-Tac-Toe game playable with just ten buttons.`,
    deadline: '2022-06-06T13:59:59.000Z',
    status: TaskStatus.Graded,
  },
];

export const TASK_MAX_MESSAGE_LENGTH = 500;
export const TASK_MAX_FILE_SIZE = 5 * MEGABYTE;
