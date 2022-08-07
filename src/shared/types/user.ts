export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: Role;
}

export interface User extends Person {
  email: string;
  active: boolean;
  // admin?: boolean;
  createdAt: string;
}

export enum Role {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}

export type FirestoreUser = Omit<
  User,
  'id' | 'fullName' | 'createdAt' | 'lastLoginAt' | 'email'
>;
