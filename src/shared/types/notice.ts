import { PublishableItem } from './shared';
import { Person } from './user';

export interface Notice extends PublishableItem {
  author: Person;
}
