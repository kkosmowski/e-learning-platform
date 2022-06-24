import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Container from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { tasks, homework } from 'shared/consts/task';
import { TaskType } from 'shared/types/task';
import { Status } from 'shared/types/shared';
import { isPastDate } from 'shared/utils/date.utils';
import TaskAnswerForm from './components/TaskAnswerForm';

export default function Task({ type }: { type: TaskType }) {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { t } = useTranslation('task');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const items = type === TaskType.Task ? tasks : homework;

  const currentTask = items.find((task) => task.id === taskId);

  if (!currentTask) {
    navigate('/404');
    return null;
  }

  const isPastDeadline = isPastDate(new Date(currentTask.deadline));

  const handleAnswerSubmit = (): void => {
    console.log('submitted');
  };

  // @todo when status is Submitted or Graded, fetch the answer and display it
  return (
    <Container sx={{ flex: 1, gap: 2 }}>
      <TaskCard task={currentTask} />

      {currentTask.status === Status.Todo && !isSubmitting && (
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

      {isSubmitting && (
        <TaskAnswerForm
          task={currentTask}
          onCancel={() => setIsSubmitting(false)}
          onSubmit={handleAnswerSubmit}
        />
      )}
    </Container>
  );
}
