export enum Status {
  Todo = 'TODO',
  Submitted = 'SUBMITTED',
  Graded = 'GRADED',
}

export interface BaseItem {
  id: string;
  // @todo implement with backend
  // createdBy: User;
  // createdOn: string; // ISOString
  // updatedBy?: User;
  // updatedOn?: string; // ISOString
}

export interface PublishableItem extends BaseItem {
  title: string;
  published: boolean;
  publishTime: string; // ISOString
  content: string;
}
