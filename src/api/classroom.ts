import { authorized } from './axios';
import {
  CreateClassroomForm,
  CreateClassroomResponse,
  GetClassroomResponse,
  GetClassroomsResponse,
  ValidateClassroomNameResponse,
} from 'shared/types/classroom';
import { mapCreateClassroomFormToPayload } from 'shared/utils/classroom.utils';

export const getClassrooms = (): Promise<GetClassroomsResponse> =>
  authorized((api) => api.get('group'));

export const createClassroom = (
  formValues: CreateClassroomForm
): Promise<CreateClassroomResponse> =>
  authorized((api) =>
    api.post('group', mapCreateClassroomFormToPayload(formValues))
  );

export const validateClassroomName = (
  name: string
): Promise<ValidateClassroomNameResponse> =>
  authorized((api) => api.get(`group/validate?name=${name}`));

export const getClassroom = (id: string): Promise<GetClassroomResponse> =>
  authorized((api) => api.get(`group/${id}`));
