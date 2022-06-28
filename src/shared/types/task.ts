import { Status } from './shared';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  content: string;
  deadline: string;
  status: Status;
}

export enum TaskType {
  Task = 'task',
  Homework = 'homework',
}
