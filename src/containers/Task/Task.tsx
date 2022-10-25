import { useParams } from 'react-router';
import { useState } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { tasks, homework, taskSubmissions } from 'shared/consts/task';
import { TaskType } from 'shared/types/task';
import { Status } from 'shared/types/shared';
import { isPastDate } from 'shared/utils/date.utils';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { CURRENT_USER } from 'shared/consts/user';
import TaskAnswerForm from './components/TaskAnswerForm';
import TaskSubmissionList from './components/TaskSubmissionList';
import useCustomNavigate from 'hooks/use-custom-navigate';

export default function Task({ type }: { type: TaskType }) {
  const { navigate } = useCustomNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { t } = useTranslation('task');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const items = type === TaskType.Task ? tasks : homework;
  const isUserStudent = isStudent(CURRENT_USER);
  const isUserTeacher = isTeacher(CURRENT_USER);

  const currentTask = items.find((task) => task.id === taskId);

  if (!currentTask) {
    navigate('/404');
    return null;
  }

  const isPastDeadline = isPastDate(new Date(currentTask.endTime));

  const handleAnswerSubmit = (): void => {
    console.log('submitted');
  };

  // @todo when status is Submitted or Graded, fetch the answer and display it
  return (
    <Centered innerSx={{ gap: 2 }}>
      <TaskCard task={currentTask} />

      {isUserStudent && currentTask.status === Status.Todo && !isSubmitting && (
        <Box>
          <Tooltip
            title={isPastDeadline ? t('tooltip.cannotSubmitPastDeadline') : ''}
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
          task={currentTask}
          onCancel={() => setIsSubmitting(false)}
          onSubmit={handleAnswerSubmit}
        />
      )}

      {isUserTeacher && (
        <TaskSubmissionList
          submissions={taskSubmissions.filter(
            (submission) => submission.taskId === taskId
          )}
        />
      )}
    </Centered>
  );
}
