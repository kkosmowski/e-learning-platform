import { TaskType } from 'shared/types/task';
import { HOUR, MINUTE } from 'shared/consts/date';

export const getTimeLeftTextColor = (
  type: TaskType,
  diffInMinutes: number
): string => {
  let veryLittleTimeLeft: number;
  let littleTimeLeft: number;

  if (type === TaskType.Task) {
    veryLittleTimeLeft = (20 * MINUTE) / 1000;
    littleTimeLeft = HOUR / 1000;
  } else {
    veryLittleTimeLeft = (2 * HOUR) / 1000;
    littleTimeLeft = (8 * HOUR) / 1000;
  }

  if (diffInMinutes < veryLittleTimeLeft) {
    return 'error';
  }
  if (diffInMinutes < littleTimeLeft) {
    return 'warning';
  }
  return 'secondary';
};
