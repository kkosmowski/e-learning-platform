import { AxiosResponse } from 'axios';

export enum Status {
  Todo = 'TODO',
  Submitted = 'SUBMITTED',
  Graded = 'GRADED',
}

export interface BaseItem {
  id: string;
  // @todo implement with backend
  // createdBy: User; // @todo discuss this with Kamila
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
