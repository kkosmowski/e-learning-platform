import { Person, Role } from 'shared/types/user';

export const isStudent = (user: Person): boolean => user.role === Role.Student;

export const isTeacher = (user: Person): boolean => user.role === Role.Teacher;
