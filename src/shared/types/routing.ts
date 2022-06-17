import { RouteObject } from 'react-router';

export interface RouteObjectWithLabel extends RouteObject {
  label: string;
}
