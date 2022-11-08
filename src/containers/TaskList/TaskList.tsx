import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { TaskType } from 'shared/types/task';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useTasksQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';

export default function TaskList({ type }: { type: TaskType }) {
  const { navigate } = useCustomNavigate();
  const { subjectId } = useParams();
  const { t } = useTranslation('task');
  const isTypeTask = type === TaskType.Task;
  const {
    [isTypeTask ? 'tasks' : 'homework']: items,
    [isTypeTask ? 'tasksLoading' : 'homeworkLoading']: isLoading,
    [isTypeTask ? 'tasksSuccess' : 'homeworkSuccess']: isSuccess,
  } = useTasksQuery(subjectId, [type]);

  const navigateToTask = (taskId: string) => {
    navigate(taskId);
  };

  return (
    <Centered>
      <Grid container spacing={2}>
        {isSuccess && items?.length ? (
          items.map((task) => (
            <Grid item key={task.id} sm={12} md={6} lg={4}>
              <TaskCard
                task={task}
                submissions={[]}
                subjectStudents={[]}
                short
                onClick={() => navigateToTask(task.id)}
              />
            </Grid>
          ))
        ) : isLoading ? (
          <PageLoading />
        ) : (
          <Typography color="text.secondary">{t(`noItems.${type}`)}</Typography>
        )}
      </Grid>
    </Centered>
  );
}
