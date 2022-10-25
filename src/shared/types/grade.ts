import { Task } from './task';
import { Test } from './test';
import { BaseItem } from './shared';
import { User } from './user';

export interface Grade extends BaseItem {
  source?: Task | Test;
  type: GradeType;
  value: number;
  student: User;
}

export enum GradeType {
  Assignment = 'assignment',
  Activity = 'activity',
  Average = 'average',
  Behaviour = 'behaviour',
  Proposed = 'proposed',
  Final = 'final',
}
