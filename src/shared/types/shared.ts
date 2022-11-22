import { AxiosResponse } from 'axios';
import { User } from './user';

export enum Status {
  NOT_SUBMITTED = 'not_submitted',
  SUBMITTED = 'submitted',
  GRADED = 'graded',
}

export interface BaseItem {
  id: string;
  createdBy?: User; // @todo change to mandatory when mocked data is no longer used
  createdAt: Date;
  // updatedBy?: User;
  // updatedOn?: string; // ISOString
}

export interface ContentItem extends BaseItem {
  name: string;
  content: string;
}

export interface ErrorData {
  detail?: string;
}

export interface Paginated<T> {
  items: T[];
  total_count: number;
}

export type EmptyResponse = AxiosResponse<null>;
