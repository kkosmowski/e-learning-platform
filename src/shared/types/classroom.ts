import { AxiosResponse } from 'axios';

import { User } from 'shared/types/user';

export interface SimpleClassroom {
  id: string;
  name: string;
  teacher: User;
  studentsCount: number;
}

export interface SimpleClassroomDto
  extends Omit<SimpleClassroom, 'studentsCount'> {
  students_count: number;
}

export interface Classroom extends Omit<SimpleClassroom, 'studentsCount'> {
  students: User[];
}

export interface CreateClassroomForm {
  name: string;
  teacher: User | null;
  students: User[];
}

// payloads

export interface CreateClassroomPayload {
  name: string;
  teacher_id: string;
  student_ids: string[];
}

// responses

export type CreateClassroomResponse = AxiosResponse<SimpleClassroomDto>;
export type GetClassroomsResponse = AxiosResponse<SimpleClassroom[]>;
export type ValidateClassroomNameResponse = AxiosResponse<boolean>;
export type GetClassroomResponse = AxiosResponse<Classroom>;
