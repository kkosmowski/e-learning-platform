import { RouteObject } from 'react-router';

import { Role } from './user';

export interface RouteObjectWithId extends RouteObject {
  id: string;
  limitedTo?: Role | Role[];
}
