import {
  CreateTaskPayload,
  Task,
  TaskDto,
  TaskForm,
  TaskType,
} from 'shared/types/task';
import { Status } from 'shared/types/shared';
import { HOURS_IN_A_DAY, MINUTES_IN_AN_HOUR } from 'shared/consts/date';
import { mapUserDtoToUser } from './user.utils';
import { dateStringToUTCString } from './date.utils';

export const getTimeLeftTextColor = (
  type: TaskType,
  diffInMinutes: number
): string => {
  let veryLittleTimeLeft: number;
  let littleTimeLeft: number;

  if (type === TaskType.Task) {
    veryLittleTimeLeft = 20 * MINUTES_IN_AN_HOUR;
    littleTimeLeft = MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY;
  } else {
    veryLittleTimeLeft = 2 * MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY;
    littleTimeLeft = 8 * MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY;
  }

  if (diffInMinutes < veryLittleTimeLeft) {
    return 'error';
  }
  if (diffInMinutes < littleTimeLeft) {
    return 'warning';
  }
  return 'secondary';
};

export const mapTaskDtoToTask = (dto: TaskDto): Task => ({
  id: dto.id,
  mandatory: dto.mandatory,
  type: dto.type,
  name: dto.name,
  content: dto.content,
  status: Status.Todo,
  createdBy: mapUserDtoToUser(dto.created_by),
  createdAt: new Date(dateStringToUTCString(dto.created_at)),
  startTime: new Date(dateStringToUTCString(dto.start_time)),
  endTime: new Date(dateStringToUTCString(dto.end_time)),
  isPublished:
    new Date(dateStringToUTCString(dto.start_time)).getTime() <
    new Date().getTime(),
});

export const mapTaskFormToCreateTaskPayload = (
  form: TaskForm
): CreateTaskPayload => ({
  group_subject_id: form.subjectId,
  mandatory: form.mandatory,
  type: form.type,
  name: form.name,
  content: form.content,
  start_time: form.startTime!,
  end_time: form.endTime!,
});
