import { Status } from './shared';

export interface Test {
  id: string;
  type: TestType;
  title: string;
  content: string;
  deadline: string;
  status: Status;
  questions: TestQuestion[];
}

export interface TestQuestion {
  id: string;
  testId: string;
  content: string;
  answers: TestAnswer[];
}

export interface TestAnswer {
  id: string;
  questionId: string;
  content: string;
}

export enum TestType {
  Closed = 'closed',
  Open = 'open',
  Mixed = 'mixed',
}
