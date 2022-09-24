import { authorized } from './axios';
import {
  CreateSubjectCategoryResponse,
  UpdateSubjectCategoryResponse,
  GetSubjectCategoriesResponse,
  SubjectCategory,
  GetSubjectsResponse,
} from 'shared/types/subject';
import { EmptyResponse } from 'shared/types/shared';

export const getSubjectCategories =
  (): Promise<GetSubjectCategoriesResponse> => {
    return authorized((api) => api.get('subject'));
  };

export const createSubjectCategory = (
  name: string
): Promise<CreateSubjectCategoryResponse> => {
  return authorized((api) => api.post('subject/create', { name }));
};

export const updateSubjectCategory = ({
  id,
  name,
}: SubjectCategory): Promise<UpdateSubjectCategoryResponse> => {
  return authorized((api) => api.put(`subject/${id}`, { name }));
};

export const deleteSubjectCategory = (id: string): Promise<EmptyResponse> => {
  return authorized((api) => api.delete(`subject/${id}`));
};

export const getSubjects = (): Promise<GetSubjectsResponse> => {
  return authorized((api) => api.get('group-subject'));
};
