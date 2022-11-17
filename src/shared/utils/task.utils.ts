import {
  CreateTaskPayload,
  Task,
  TaskDto,
  TaskForm,
  TaskType,
  UpdateTaskPayload,
} from 'shared/types/task';
import { Status } from 'shared/types/shared';
import { mapUserDtoToUser } from './user.utils';
import { dateStringToUTCString } from './date.utils';
import {
  TASK_HOMEWORK_ENDING_SOON_TIME_IN_MINUTES,
  TASK_HOMEWORK_ENDING_VERY_SOON_TIME_IN_MINUTES,
  TASK_TASK_ENDING_SOON_TIME_IN_MINUTES,
  TASK_TASK_ENDING_VERY_SOON_TIME_IN_MINUTES,
} from 'shared/consts/task';

export const getTimeLeftTextColor = (
  type: TaskType,
  diffInMinutes: number
): string => {
  let veryLittleTimeLeft: number;
  let littleTimeLeft: number;

  if (type === TaskType.Task) {
    veryLittleTimeLeft = TASK_TASK_ENDING_VERY_SOON_TIME_IN_MINUTES;
    littleTimeLeft = TASK_TASK_ENDING_SOON_TIME_IN_MINUTES;
  } else {
    veryLittleTimeLeft = TASK_HOMEWORK_ENDING_VERY_SOON_TIME_IN_MINUTES;
    littleTimeLeft = TASK_HOMEWORK_ENDING_SOON_TIME_IN_MINUTES;
  }
  if (diffInMinutes < veryLittleTimeLeft) {
    return 'error';
  }
  if (diffInMinutes < littleTimeLeft) {
    return 'text.warning';
  }
  return 'text';
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
  canBeDeletedBefore: new Date(
    dateStringToUTCString(dto.can_be_deleted_before)
  ),
});

export const mapTaskFormToUpdateTaskPayload = (
  id: string,
  form: Partial<TaskForm>
): UpdateTaskPayload => ({
  id,
  mandatory: form.mandatory,
  name: form.name,
  content: form.content,
  end_time: form.endTime!,
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
