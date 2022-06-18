import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { Box, Button } from '@mui/material';

import Container from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { tasks } from 'shared/consts/task';
import { TaskStatus } from 'shared/types/task';
import TaskAnswerForm from './components/TaskAnswerForm';

export default function Task() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const currentTask = tasks.find((task) => task.id === taskId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentTask) {
    navigate('/404');
    return null;
  }

  const handleAnswerSubmit = (): void => {
    console.log('submitted');
  };

  // @todo when status is Submitted or Graded, fetch the answer and display it
  return (
    <Container sx={{ flex: 1, gap: 2 }}>
      <TaskCard task={currentTask} />

      {currentTask.status === TaskStatus.Todo && !isSubmitting && (
        <Box>
          <Button variant="contained" onClick={() => setIsSubmitting(true)}>
            Submit a solution
          </Button>
        </Box>
      )}

      {isSubmitting && (
        <TaskAnswerForm
          task={currentTask}
          onCancel={() => setIsSubmitting(false)}
          onSubmit={handleAnswerSubmit}
        />
      )}

      {}
    </Container>
  );
}
