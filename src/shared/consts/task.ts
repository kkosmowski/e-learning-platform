import { MEGABYTE } from './file';
import { HOUR, HOURS_IN_A_DAY } from './date';

export const TASK_MAX_MESSAGE_LENGTH = 500;
export const TASK_MAX_FILE_SIZE = 5 * MEGABYTE;
export const MIN_TASK_DURATION_IN_MINUTES = 10;
export const MAX_TASK_DURATION_IN_MINUTES = 12 * HOUR;
export const MIN_HOMEWORK_DURATION_IN_MINUTES = 12 * HOUR;
export const DEFAULT_TASK_DURATION_IN_HOURS = 2;
export const DEFAULT_HOMEWORK_DURATION_IN_HOURS = HOURS_IN_A_DAY;
export const VISIBLE_LATEST_TASKS = 3;
export const TASK_LIST_PAGE_SIZE = 12;

export const TASK_DURATIONS = [
  15, 30, 45, 60, 90, 240, 480, 720, 1440, 2880, 4320,
];
