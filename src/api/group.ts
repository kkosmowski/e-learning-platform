import { authorized } from './axios';
import {
  CreateClassroomForm,
  CreateClassroomResponse,
  GetClassroomsResponse,
} from 'shared/types/classroom';
import { mapCreateClassroomFormToPayload } from 'shared/utils/group.utils';
import { ValidateGroupNameResponse } from 'shared/types/user';

export const getClassrooms = (): Promise<GetClassroomsResponse> =>
  authorized((api) => api.get('group'));

export const createClassroom = (
  formValues: CreateClassroomForm
): Promise<CreateClassroomResponse> =>
  authorized((api) =>
    api.post('group', mapCreateClassroomFormToPayload(formValues))
  );

export const validateClassromName = (
  name: string
): Promise<ValidateGroupNameResponse> =>
  authorized((api) => api.get(`group/validate?name=${name}`));
