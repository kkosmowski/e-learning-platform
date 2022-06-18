import { Grid } from '@mui/material';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import TaskCard from 'shared/components/TaskCard';
import { Task } from 'shared/types/task';

interface LatestTasksProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  onMoreClick: () => void;
}

export default function LatestTasks(props: LatestTasksProps) {
  const { tasks, onTaskClick, onMoreClick } = props;

  return (
    <>
      <SectionTitle>
        <span>Latest tasks</span>

        <TextButton sx={{ ml: 2 }} onClick={onMoreClick}>
          View more
        </TextButton>
      </SectionTitle>

      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item key={task.id} xs={12} md={6} lg={4}>
            <TaskCard task={task} short onClick={() => onTaskClick(task.id)} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
