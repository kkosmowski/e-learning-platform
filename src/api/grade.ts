import { authorized } from './axios';
import {
  CreateGradePayload,
  CreateGradeResponse,
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
