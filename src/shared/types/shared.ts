import { AxiosResponse } from 'axios';
import { User } from './user';

export enum Status {
  Todo = 'TODO',
  Submitted = 'SUBMITTED',
  Graded = 'GRADED',
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

export type EmptyResponse = AxiosResponse<null>;
