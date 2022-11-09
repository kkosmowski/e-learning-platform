import { useParams } from 'react-router';
import { useState } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { TaskType } from 'shared/types/task';
import { Status } from 'shared/types/shared';
import { isPastDate } from 'shared/utils/date.utils';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import TaskAnswerForm from './components/TaskAnswerForm';
import TaskSubmissionList from './components/TaskSubmissionList';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useAuth } from 'contexts/auth';
import { useTasksQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';

export default function Task({ type }: { type: TaskType }) {
  const { navigate } = useCustomNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { t } = useTranslation('task');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const isUserStudent = isStudent(currentUser);
  const isUserTeacher = isTeacher(currentUser);
  const {
    task,
    taskLoading: isLoading,
    taskSuccess: isSuccess,
  } = useTasksQuery({ taskId });

  if (!isLoading && !task) {
    navigate('/404');
    return null;
  }

  const isPastDeadline = !!task && isPastDate(new Date(task.endTime));

  const handleAnswerSubmit = (): void => {
    console.log('submitted');
  };

  return (
    <Centered innerSx={{ gap: 2 }}>
      {isSuccess && task ? (
        <>
          <TaskCard task={task} />

          {isUserStudent && task.status === Status.Todo && !isSubmitting && (
            <Box>
              <Tooltip
                title={
                  isPastDeadline ? t('tooltip.cannotSubmitPastDeadline') : ''
                }
              >
                <span>
                  <Button
                    variant="contained"
                    disabled={isPastDeadline}
                    onClick={() => setIsSubmitting(true)}
                  >
                    {t('submitSolution')}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          )}

          {isUserStudent && isSubmitting && (
            <TaskAnswerForm
              task={task}
              onCancel={() => setIsSubmitting(false)}
              onSubmit={handleAnswerSubmit}
            />
          )}

          {isUserTeacher && <TaskSubmissionList submissions={[]} />}
        </>
      ) : isLoading ? (
        <PageLoading />
      ) : null}
    </Centered>
  );
}
