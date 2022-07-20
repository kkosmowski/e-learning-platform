import { BaseItem, PublishableItem, Status } from './shared';

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

export interface TaskSubmission extends BaseItem {
  taskId: string; // @todo consider full task data
  studentId: string; // @todo consider full student data
  status: Status;
}
