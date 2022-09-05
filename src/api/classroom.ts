import { authorized } from './axios';
import {
  Classroom,
  ClassroomForm,
  CreateClassroomResponse,
  GetClassroomResponse,
  GetClassroomsResponse,
  UpdateClassroomPayload,
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

export const updateClassroom = (
  classroom: UpdateClassroomPayload
): Promise<GetClassroomResponse> =>
  authorized((api) => api.put(`group/${classroom.id}`, classroom));
