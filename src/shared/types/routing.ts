import { RouteObject } from 'react-router';

export interface RouteObjectWithId extends RouteObject {
  id: string;
}
