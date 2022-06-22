export interface Task {
  id: string;
  type: TaskType;
  title: string;
  content: string;
  deadline: string;
  status: TaskStatus;
}

export enum TaskStatus {
  Todo = 'TODO',
  Submitted = 'SUBMITTED',
  Graded = 'GRADED',
}

export enum TaskType {
  Task = 'Task',
  Homework = 'Homework',
}
