import { authorized } from './axios';
import {
  ClassForm,
  CreateClassResponse,
  GetClassResponse,
  GetClassesResponse,
  UpdateClassPayload,
  ValidateClassNameResponse,
} from 'shared/types/class';
import { mapClassFormToCreateClassPayload } from 'shared/utils/class.utils';
import { CLASS_PAGE_SIZE } from 'shared/consts/class';

export const getClasses = (offset: number): Promise<GetClassesResponse> =>
  authorized((api) =>
    api.get(`group?limit=${CLASS_PAGE_SIZE}&offset=${offset}`)
  );

export const createClass = (
  formValues: ClassForm
): Promise<CreateClassResponse> =>
  authorized((api) =>
    api.post('group', mapClassFormToCreateClassPayload(formValues))
  );

export const validateClassName = (
  name: string
): Promise<ValidateClassNameResponse> =>
  authorized((api) => api.get(`group/validate?name=${name}`));

export const getClass = (id: string): Promise<GetClassResponse> =>
  authorized((api) => api.get(`group/${id}`));

export const updateClass = (
  currentClass: UpdateClassPayload
): Promise<GetClassResponse> =>
  authorized((api) => api.put(`group/${currentClass.id}`, currentClass));
