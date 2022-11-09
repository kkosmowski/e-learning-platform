import { Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Masonry } from '@mui/lab';

import { Centered } from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { TaskType } from 'shared/types/task';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useTasksQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import SectionTitle from 'shared/components/SectionTitle';

export default function TaskList({ type }: { type: TaskType }) {
  const { navigate } = useCustomNavigate();
  const { subjectId } = useParams();
  const { t } = useTranslation('task');
  const isTypeTask = type === TaskType.Task;
  const {
    [isTypeTask ? 'tasks' : 'homework']: items,
    [isTypeTask ? 'tasksLoading' : 'homeworkLoading']: isLoading,
    [isTypeTask ? 'tasksSuccess' : 'homeworkSuccess']: isSuccess,
  } = useTasksQuery({ subjectId, enabled: [type] });

  const navigateToTask = (taskId: string) => {
    navigate(taskId);
  };

  return (
    <Centered>
      <SectionTitle>{t(`title.${type}`)}</SectionTitle>

      {isSuccess && items?.length ? (
        <Masonry columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
          {items.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              submissions={[]}
              subjectStudents={[]}
              short
              onClick={() => navigateToTask(task.id)}
            />
          ))}
        </Masonry>
      ) : isLoading ? (
        <PageLoading />
      ) : (
        <Typography color="text.secondary">{t(`noItems.${type}`)}</Typography>
      )}
    </Centered>
  );
}
