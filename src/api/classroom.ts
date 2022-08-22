import { authorized } from './axios';
import {
  ClassroomForm,
  CreateClassroomResponse,
  GetClassroomResponse,
  GetClassroomsResponse,
  ValidateClassroomNameResponse,
} from 'shared/types/classroom';
import { mapClassroomFormToCreateClassroomPayload } from 'shared/utils/classroom.utils';

export const getClassrooms = (): Promise<GetClassroomsResponse> =>
  authorized((api) => api.get('group'));

export const createClassroom = (
  formValues: ClassroomForm
): Promise<CreateClassroomResponse> =>
  authorized((api) =>
    api.post('group', mapClassroomFormToCreateClassroomPayload(formValues))
  );

export const validateClassroomName = (
  name: string
): Promise<ValidateClassroomNameResponse> =>
  authorized((api) => api.get(`group/validate?name=${name}`));

export const getClassroom = (id: string): Promise<GetClassroomResponse> =>
  authorized((api) => api.get(`group/${id}`));
