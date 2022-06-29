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
  admin?: boolean;
}

export enum Role {
  Student = 'Student',
  Teacher = 'Teacher',
  Admin = 'Admin',
}

export interface Student extends Person {
  role: Role.Student;
  // subjectInstanceIds: string[];
}

export interface Teacher extends Person {
  role: Role.Teacher;
  // subjectInstanceIds: string[];
}
