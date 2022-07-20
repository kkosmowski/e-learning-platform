import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';

import { Centered } from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { tasks, homework, taskSubmissions } from 'shared/consts/task';
import { TaskType } from 'shared/types/task';
import { subjectStudents } from 'shared/consts/subject';

export default function TaskList({ type }: { type: TaskType }) {
  const navigate = useNavigate();

  const items = type === TaskType.Task ? tasks : homework;

  const navigateToTask = (taskId: string) => {
    navigate(taskId);
  };

  return (
    <Centered>
      <Grid container spacing={2}>
        {items.map((task) => (
          <Grid item key={task.id} sm={12} md={6} lg={4}>
            <TaskCard
              task={task}
              submissions={taskSubmissions.filter(
                (submission) => submission.taskId === task.id
              )}
              subjectStudents={subjectStudents}
              short
              onClick={() => navigateToTask(task.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Centered>
  );
}
