import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';

import Container from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { tasks, homework } from 'shared/consts/task';
import { TaskType } from 'shared/types/task';

export default function TaskList({ type }: { type: TaskType }) {
  const navigate = useNavigate();

  const items = type === TaskType.Task ? tasks : homework;

  const navigateToTask = (taskId: string) => {
    navigate(taskId);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {items.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} lg={4} xl={3}>
            <TaskCard
              task={task}
              short
              onClick={() => navigateToTask(task.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
