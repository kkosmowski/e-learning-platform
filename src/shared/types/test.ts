import { BaseItem, ContentItem, Status } from './shared';

export interface Test extends ContentItem {
  type: TestType;
  startTime: Date;
  endTime: Date;
  status: Status;
  questions: TestQuestion[];
}

export interface TestQuestion extends BaseItem {
  testId: string;
  content: string;
  options: TestOption[] | null; // only if type Closed
}

export interface TestOption {
  id: string;
  questionId: string;
  value: string;
  text: string;
}

export interface TestAttempt extends BaseItem {
  studentId: string;
  testId: string;
  answers: TestAnswer[];
}

export interface TestAnswer extends BaseItem {
  studentId: string;
  testId: string;
  questionId: string;
  answer: string; // either text answer or TestOption value (depending on QuestionType)
}

export enum TestType {
  Closed = 'closed',
  Open = 'open',
  Mixed = 'mixed',
}
