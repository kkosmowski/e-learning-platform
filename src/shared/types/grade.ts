import { Task } from './task';
import { Test } from './test';

export interface Grade {
  id: string;
  source?: Task | Test;
  type: GradeType;
  value: number;
  createdAt?: string;
}

export enum GradeType {
  Assignment = 'assignment',
  Activity = 'activity',
  Average = 'average',
  Behaviour = 'behaviour',
  Proposed = 'proposed',
  Final = 'final',
}
