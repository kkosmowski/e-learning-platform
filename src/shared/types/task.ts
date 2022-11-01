import { BaseItem, ContentItem, Status } from './shared';

export interface Task extends ContentItem {
  mandatory: boolean;
  type: TaskType;
  status: Status;
  startTime: Date;
  endTime: Date;
}

export enum TaskType {
  Task = 'task',
  Homework = 'homework',
}

export interface TaskSubmission extends BaseItem {
  taskId: string; // @todo consider full task data
  studentId: string; // @todo consider full student data
  status: Status;
  // fileUrl: string;
  // comment: string;
}

export interface TaskForm {
  subjectId: string;
  name: string;
  content: string;
  startTime: Date | null;
  endTime: Date | null;
}
