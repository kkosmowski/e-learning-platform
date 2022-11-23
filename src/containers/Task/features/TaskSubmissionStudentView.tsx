import { useState } from 'react';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Task } from 'shared/types/task';
import { useTaskSubmissionQuery } from 'shared/queries';
import { Status } from 'shared/types/shared';
import { isPastDate } from 'shared/utils/date.utils';
import TaskSubmissionItem from '../components/TaskSubmissionItem';
import SubmitTaskForm from '../components/SubmitTaskForm';

interface TaskSubmissionStudentViewProps {
  task: Task;
}

export default function TaskSubmissionStudentView(
  props: TaskSubmissionStudentViewProps
) {
  const { task } = props;
  const [isSubmitFormVisible, setIsSubmitFormVisible] = useState(false);
  const { taskSubmission, submitSolution } = useTaskSubmissionQuery(task.id);
  const { t } = useTranslation('task');

  const hasAlreadySubmitted = Boolean(
    taskSubmission?.status !== Status.NOT_SUBMITTED
  );

  const isPastDeadline = !!task && isPastDate(new Date(task.endTime));

  const handleTaskSubmit = (formData: FormData): void => {
    submitSolution({ taskId: task.id, formData });
  };
  return (
    <>
      {!hasAlreadySubmitted && !isSubmitFormVisible && (
        <Box>
          <Tooltip
            title={isPastDeadline ? t('tooltip.cannotSubmitPastDeadline') : ''}
          >
            <span>
              <Button
                variant="contained"
                disabled={isPastDeadline || hasAlreadySubmitted}
                onClick={() => setIsSubmitFormVisible(true)}
              >
                {t('submitSolution')}
              </Button>
            </span>
          </Tooltip>
        </Box>
      )}

      {hasAlreadySubmitted
        ? !!taskSubmission && (
            <Stack gap={2}>
              <Typography variant="h3">
                Twoja odpowiedź na zadanie <strong>{task.name}</strong>
              </Typography>
              <TaskSubmissionItem task={task} taskSubmission={taskSubmission} />
            </Stack>
          )
        : isSubmitFormVisible && (
            <SubmitTaskForm
              task={task}
              onCancel={() => setIsSubmitFormVisible(false)}
              onSubmit={handleTaskSubmit}
            />
          )}
    </>
  );
}
