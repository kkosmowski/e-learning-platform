import { Task } from './task';
import { Test } from './test';
import { BaseItem } from './shared';
import { Student } from './user';

export interface Grade extends BaseItem {
  source?: Task | Test;
  type: GradeType;
  value: number;
  createdOn: string; // ISOString // @todo remove after BaseItem createdOn is implemented
  student: Student;
}

export enum GradeType {
  Assignment = 'assignment',
  Activity = 'activity',
  Average = 'average',
  Behaviour = 'behaviour',
  Proposed = 'proposed',
  Final = 'final',
}
