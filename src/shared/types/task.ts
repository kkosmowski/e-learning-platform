import { PublishableItem, Status } from './shared';

export interface Task extends PublishableItem {
  mandatory: boolean;
  deadline: string; // ISOString
  type: TaskType;
  status: Status;
}

export enum TaskType {
  Task = 'task',
  Homework = 'homework',
}
