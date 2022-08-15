import { AxiosResponse } from 'axios';

import { User } from 'shared/types/user';

export interface SimpleClassroom {
  id: string;
  name: string;
  teacher: User;
  studentsCount: number;
}

export interface SimpleClassromDto
  extends Omit<SimpleClassroom, 'studentsCount'> {
  students_count: number;
}

export interface Classroom extends Omit<SimpleClassroom, 'studentsCount'> {
  students: User[];
}

export interface CreateClassroomForm {
  name: string;
  teacherId: string | null;
  studentIds: string[];
}

// payloads

export interface CreateClassroomPayload {
  name: string;
  teacher_id: string;
  student_ids: string[];
}

// responses

export type CreateClassroomResponse = AxiosResponse<SimpleClassroom>;
