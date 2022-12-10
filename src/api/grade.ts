import { authorized } from './axios';
import {
  CreateGradePayload,
  CreateGradeResponse,
  GetGradeResponse,
  GetGradesResponse,
  UpdateGradePayload,
  UpdateGradeResponse,
} from 'shared/types/grade';

export const createGrade = (
  payload: CreateGradePayload
): Promise<CreateGradeResponse> =>
  authorized((api) => api.post('grade', payload));

export const updateGrade = ({
  id,
  ...data
}: UpdateGradePayload): Promise<UpdateGradeResponse> =>
  authorized((api) => api.patch(`grade/${id}`, data));

export const getStudentGrades = (
  studentId: string
): Promise<GetGradesResponse> =>
  authorized((api) => api.get(`grade/student/${studentId}`));

export const getTaskGrades = (taskId: string): Promise<GetGradesResponse> =>
  authorized((api) => api.get(`grade/task/${taskId}`));

export const getGrade = (taskId: string): Promise<GetGradeResponse> =>
  authorized((api) => api.get(`grade/task/${taskId}/student`));

export const getSubjectGrades = (
  subjectId: string
): Promise<GetGradesResponse> =>
  authorized((api) => api.get(`grade/group-subject/${subjectId}`));
