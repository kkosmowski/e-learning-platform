import { CreateTaskPayload, TaskForm, TaskType } from 'shared/types/task';
import { HOURS_IN_A_DAY, MINUTES_IN_AN_HOUR } from 'shared/consts/date';

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

export const mapTaskFormToCreateTaskPayload = (
  form: TaskForm
): CreateTaskPayload => ({
  group_subject_id: form.subjectId,
  mandatory: true,
  type: form.type,
  name: form.name,
  content: form.content,
  start_time: form.startTime!,
  end_time: form.endTime!,
});
