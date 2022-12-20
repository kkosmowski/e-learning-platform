import {
  CreateTaskPayload,
  SimpleTaskSubmission,
  SimpleTaskSubmissionDto,
  Task,
  TaskDto,
  TaskForm,
  TaskSubmission,
  TaskSubmissionDto,
  TaskType,
  TaskWithSubmissions,
  TaskWithSubmissionsDto,
  UpdateTaskPayload,
} from 'shared/types/task';
import { mapSimpleUserDtoToSimpleUser } from './user.utils';
import { dateStringToUTCString, isPastDate } from './date.utils';
import {
  TASK_HOMEWORK_ENDING_SOON_TIME_IN_MINUTES,
  TASK_HOMEWORK_ENDING_VERY_SOON_TIME_IN_MINUTES,
  TASK_TASK_ENDING_SOON_TIME_IN_MINUTES,
  TASK_TASK_ENDING_VERY_SOON_TIME_IN_MINUTES,
} from 'shared/consts/task';

export const getTimeLeftTextColor = (
  type: TaskType,
  diffInMinutes: number,
  isSubmitted = false
): string => {
  if (isSubmitted) {
    return 'text';
  }

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
  createdBy: mapSimpleUserDtoToSimpleUser(dto.created_by),
  createdAt: new Date(dateStringToUTCString(dto.created_at)),
  startTime: new Date(dateStringToUTCString(dto.start_time)),
  endTime: new Date(dateStringToUTCString(dto.end_time)),
  isPublished: isPastDate(new Date(dateStringToUTCString(dto.start_time))),
  isFinished: isPastDate(new Date(dateStringToUTCString(dto.end_time))),
  canBeDeletedBefore: new Date(
    dateStringToUTCString(dto.can_be_deleted_before)
  ),
});

export const mapTaskWithSubmissionsDtoToTaskWithSubmissions = (
  dto: TaskWithSubmissionsDto
): TaskWithSubmissions => ({
  ...mapTaskDtoToTask(dto),
  received: dto.received,
  expected: dto.expected,
  submission: dto.submission
    ? mapSimpleTaskSubmissionDtoToSimpleTaskSubmission(dto.submission)
    : null,
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

export const mapSimpleTaskSubmissionDtoToSimpleTaskSubmission = (
  dto: SimpleTaskSubmissionDto
): SimpleTaskSubmission => ({
  id: dto.id,
  taskId: dto.task_id,
  status: dto.status,
  ...(dto.created_at && {
    createdAt: new Date(dateStringToUTCString(dto.created_at)),
  }),
  fileUrl: dto.file_url,
  comment: dto.comment,
});

export const mapTaskSubmissionDtoToTaskSubmission = (
  dto: TaskSubmissionDto
): TaskSubmission => ({
  ...mapSimpleTaskSubmissionDtoToSimpleTaskSubmission(dto),
  createdBy: mapSimpleUserDtoToSimpleUser(dto.user),
});

export const isTaskSubmission = (
  submission: SimpleTaskSubmission | TaskSubmission
): submission is TaskSubmission => !!(submission as TaskSubmission).createdBy;
