import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Task } from 'shared/types/task';
import { useGradeQuery, useTaskSubmissionQuery } from 'shared/queries';
import { Status } from 'shared/types/shared';
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
  const { taskSubmission, submitSolution } = useTaskSubmissionQuery(
    task.id,
    true
  );
  const { grade } = useGradeQuery(task.id);
  const { t } = useTranslation('task');

  const hasAlreadySubmitted = Boolean(
    taskSubmission?.status !== Status.NOT_SUBMITTED
  );

  const handleTaskSubmit = (formData: FormData): void => {
    submitSolution({ taskId: task.id, formData });
  };
  return (
    <>
      {!hasAlreadySubmitted && !isSubmitFormVisible && (
        <Box>
          <Tooltip
            title={
              task?.isFinished ? t('tooltip.cannotSubmitPastDeadline') : ''
            }
          >
            <span>
              <Button
                variant="contained"
                disabled={task?.isFinished || hasAlreadySubmitted}
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
              {grade && (
                <Alert sx={sxProps.receivedGrade} severity="info" elevation={1}>
                  <Typography>{t('submissions.receivedGrade')}</Typography>
                  {/* @todo switch to lowest grade when implemented */}
                  <Chip
                    sx={sxProps.gradeValue}
                    color={grade.value === 1 ? 'error' : 'primary'}
                    label={grade.value}
                  />
                </Alert>
              )}

              <Typography variant="h3">
                {t('submissions.yourSubmission')}
              </Typography>

              <Card>
                <CardContent>
                  <TaskSubmissionItem submission={taskSubmission} />
                </CardContent>
              </Card>
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

const sxProps = {
  receivedGrade: {
    mb: 2,
    '.MuiAlert-icon': {
      alignItems: 'center',
    },
    '.MuiAlert-message': {
      display: 'inline-flex',
      alignItems: 'center',
      columnGap: 1,
    },
  },
  gradeValue: {
    fontWeight: 800,
    fontSize: 16,
    height: 28,
    '.MuiChip-label': {
      px: 1.175,
    },
  },
};
