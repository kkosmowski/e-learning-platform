import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';

import Container from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { tasks } from 'shared/consts/task';

export default function TaskList() {
  const navigate = useNavigate();

  const navigateToTask = (taskId: string) => {
    navigate(taskId);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {tasks.map((task) => (
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
