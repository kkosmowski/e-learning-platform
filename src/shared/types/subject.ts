import { Task } from './task';
import { Test } from './test';

export interface Grade {
  id: string;
  source: Task | Test;
  value: number;
}
