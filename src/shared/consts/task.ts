import { Status } from 'shared/types/shared';
import { Task, TaskType } from 'shared/types/task';
import { MEGABYTE } from './file';

export const tasks: Task[] = [
  {
    id: 'nv4i',
    type: TaskType.Task,
    title: 'Monochromatic website',
    content: `You are tasked with implementing a simple web page using HTML and CSS.

The page should use a single main (primary color) as well as unrestricted range of monochromatic (gray) shades.
It would be great if the page contained various content.

Mobile view is not necessary.`,
    deadline: '2022-06-20T13:59:59.000Z',
    status: Status.Todo,
  },
  {
    id: 'y4ge',
    type: TaskType.Task,
    title: 'Logo of the subject',
    content: `This time a simple task of designing a logo of our subject. 

Make sure to not use too many colors, 3 should be a maximum, of course the usage of gray shades is unlimited.

Try to make a simple, flat logo.`,
    deadline: '2022-06-13T13:59:59.000Z',
    status: Status.Submitted,
  },
  {
    id: '24sd',
    type: TaskType.Task,
    title: 'Simple JavaScript game',
    content: `We've all played video games, but have you ever played web game? 

JS games can be made a lot of ways, but today we will make a game that uses DOM as its fundamentals.

We will be manipulating DOM in order to make the Tic-Tac-Toe game playable with just ten buttons.`,
    deadline: '2022-06-06T13:59:59.000Z',
    status: Status.Graded,
  },
  {
    id: 'y244',
    type: TaskType.Task,
    title: 'Simple JavaScript algorithm',
    content: `Bla bla bla`,
    deadline: '2022-05-23T16:59:59.000Z',
    status: Status.Graded,
  },
  {
    id: 'yh2y',
    type: TaskType.Task,
    title: 'Difficult task to do',
    content: `Bla bla bla`,
    deadline: '2022-05-16T21:59:59.000Z',
    status: Status.Graded,
  },
];

export const homework: Task[] = [
  {
    id: 'g43h',
    type: TaskType.Homework,
    title: '250 words about your favourite movie',
    content: `Your homework for this week is to write 250 words about your favourite movie.
The genre can be anything except documentaries. We're talking about feature films.

Make sure to add few sentences about stuff such as actors performance, music, sound, image and the plot itself.
Deadline is Sunday!`,
    deadline: '2022-06-26T22:59:59.000Z',
    status: Status.Todo,
  },
  {
    id: 'r12g',
    type: TaskType.Homework,
    title: 'Uninteresting homework',
    content: `Bla bla bla.`,
    deadline: '2022-06-21T13:59:59.000Z',
    status: Status.Submitted,
  },
  {
    id: '34tt',
    type: TaskType.Homework,
    title: 'Small web application',
    content: `Hello everyone!
Even though the title says "small" web application, this is still a bit of requiring to ask for a homework.

The app should be written in React, though if your justification will be good enough, you can use other solutions.
Your deadline is 2 weeks, which is 28th of June, noon.`,
    deadline: '2022-06-28T11:59:59.000Z',
    status: Status.Graded,
  },
  {
    id: 'h244',
    type: TaskType.Homework,
    title: 'Some old homework',
    content: `Bla bla bla.`,
    deadline: '2022-05-30T21:59:59.000Z',
    status: Status.Graded,
  },
  {
    id: 'rt32',
    type: TaskType.Homework,
    title: 'Difficult homework',
    content: `Bla bla bla.`,
    deadline: '2022-05-23T21:59:59.000Z',
    status: Status.Graded,
  },
];

export const TASK_MAX_MESSAGE_LENGTH = 500;
export const TASK_MAX_FILE_SIZE = 5 * MEGABYTE;
