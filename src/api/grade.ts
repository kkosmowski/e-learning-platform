import { authorized } from './axios';
import {
  CreateGradePayload,
  CreateGradeResponse,
  CreateProposedGradePayload,
  GetGradeResponse,
  GetGradesResponse,
  UpdateGradePayload,
  UpdateGradeResponse,
} from 'shared/types/grade';
import { EmptyResponse } from 'shared/types/shared';

export const createGrade = (
  payload: CreateGradePayload
): Promise<CreateGradeResponse> =>
  authorized((api) => api.post('grade', payload));

export const createProposedGrade = (
  payload: CreateProposedGradePayload
): Promise<CreateGradeResponse> =>
  authorized((api) => api.post('grade/proposed', payload));

export const createFinalGrade = (): Promise<CreateGradeResponse> =>
  authorized((api) => api.post('grade/final'));

export const updateGrade = ({
  id,
  ...data
}: UpdateGradePayload): Promise<UpdateGradeResponse> =>
  authorized((api) => api.patch(`grade/${id}`, data));

export const getStudentGrades = (
  studentId: string
): Promise<GetGradesResponse> =>
  authorized((api) => api.get(`grade/${studentId}`));

export const getTaskGrades = (taskId: string): Promise<GetGradesResponse> =>
  authorized((api) => api.get(`grade/task/${taskId}`));

export const getGrade = (taskId: string): Promise<GetGradeResponse> =>
  authorized((api) => api.get(`grade/task/${taskId}/student`));

export const evaluateNotSubmitted = (taskId: string): Promise<EmptyResponse> =>
  authorized((api) => api.get(`grade/task/${taskId}/evaluate-not-submitted`));

export const getSubjectGrades = (
  subjectId: string
): Promise<GetGradesResponse> =>
  authorized((api) => api.get(`grade/group-subject/${subjectId}`));

export const getLatestGrades = (
  subjectId: string,
  limit: number
): Promise<GetGradesResponse> =>
  authorized((api) =>
    api.get(`group-subject/${subjectId}/latest-grades?limit=${limit}`)
  );
