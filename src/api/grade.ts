import { authorized } from './axios';
import {
  CreateFinalGradePayload,
  CreateGradePayload,
  CreateGradeResponse,
  CreateProposedGradePayload,
  GetGradeResponse,
  GetGradesResponse,
  GetGradesSummaryResponse,
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

export const createFinalGrade = (
  payload: CreateFinalGradePayload
): Promise<CreateGradeResponse> =>
  authorized((api) => api.post('grade/final', payload));

export const updateGrade = ({
  gradeId,
  studentId,
  ...data
}: UpdateGradePayload): Promise<UpdateGradeResponse> =>
  authorized((api) => api.put(`grade/${gradeId}/student/${studentId}`, data));

export const updateProposedGrade = (
  payload: CreateProposedGradePayload
): Promise<CreateGradeResponse> =>
  authorized((api) => api.put('grade/proposed', payload));

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

export const getGradesSummary = (): Promise<GetGradesSummaryResponse> =>
  authorized((api) => api.get('grade/summary'));
