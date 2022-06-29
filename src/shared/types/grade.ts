import { Task } from './task';
import { Test } from './test';
import { BaseItem } from './shared';

export interface Grade extends BaseItem {
  source?: Task | Test;
  type: GradeType;
  value: number;
  createdAt: string; // ISOString // @todo remove after BaseItem createdAt is implemented
}

export enum GradeType {
  Assignment = 'assignment',
  Activity = 'activity',
  Average = 'average',
  Behaviour = 'behaviour',
  Proposed = 'proposed',
  Final = 'final',
}
