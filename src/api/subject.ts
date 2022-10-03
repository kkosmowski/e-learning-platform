import { authorized } from './axios';
import {
  CreateSubjectCategoryResponse,
  UpdateSubjectCategoryResponse,
  GetSubjectCategoriesResponse,
  SubjectCategory,
  GetSubjectsResponse,
  GetSubjectResponse,
  UpdateSubjectPayload,
  SubjectForm,
  CreateSubjectResponse,
} from 'shared/types/subject';
import { EmptyResponse } from 'shared/types/shared';
import { mapSubjectFormToCreatSubjectPayload } from 'shared/utils/subject.utils';

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

export const createSubject = (
  formValues: SubjectForm
): Promise<CreateSubjectResponse> =>
  authorized((api) =>
    api.post('group-subject', mapSubjectFormToCreatSubjectPayload(formValues))
  );

export const getSubject = (subjectId: string): Promise<GetSubjectResponse> => {
  return authorized((api) => api.get(`group-subject/${subjectId}`));
};

export const updateSubject = ({
  id,
  teacher_id,
}: UpdateSubjectPayload): Promise<GetSubjectResponse> => {
  return authorized((api) => api.put(`group-subject/${id}`, { teacher_id }));
};
