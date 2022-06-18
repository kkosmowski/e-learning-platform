export interface Task {
  id: string;
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
