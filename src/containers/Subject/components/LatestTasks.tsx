import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import TaskCard from 'shared/components/TaskCard';
import { TaskType } from 'shared/types/task';
import { isTeacher } from 'shared/utils/user.utils';
import { VISIBLE_LATEST_TASKS } from 'shared/consts/task';
import { useAuth } from 'contexts/auth';
import { useTasksQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';

interface LatestTasksProps {
  type: TaskType;
  subjectId: string;
  onTaskClick: (type: TaskType, taskId: string) => void;
  onMoreClick: (type: TaskType) => void;
  onCreateTask: (type: TaskType) => void;
}

export default function LatestTasks(props: LatestTasksProps) {
  const { type, subjectId, onTaskClick, onMoreClick, onCreateTask } = props;
  const { t } = useTranslation('subject');
  const { currentUser } = useAuth();
  const isUserTeacher = isTeacher(currentUser);
  const isTypeTask = type === TaskType.Task;
  const {
    [isTypeTask ? 'tasks' : 'homework']: items,
    [isTypeTask ? 'tasksLoading' : 'homeworkLoading']: isLoading,
    [isTypeTask ? 'tasksSuccess' : 'homeworkSuccess']: isSuccess,
  } = useTasksQuery({ subjectId, enabled: [type] });

  return (
    <>
      <SectionTitle>
        <span>
          {isTypeTask ? t('general.latestTasks') : t('general.latestHomework')}
        </span>

        {Boolean(items?.length) && (
          <TextButton sx={{ ml: 2 }} onClick={() => onMoreClick(type)}>
            {t('common:viewMore')}
          </TextButton>
        )}

        {isUserTeacher && (
          <TextButton sx={{ ml: 2 }} onClick={() => onCreateTask(type)}>
            {t(`createNew.${type}`)}
          </TextButton>
        )}
      </SectionTitle>

      <Box>
        {isSuccess && items?.length ? (
          <Grid container spacing={2}>
            {items.slice(0, VISIBLE_LATEST_TASKS).map((task) => (
              <Grid item key={task.id} xs={12} md={6} lg={4}>
                <TaskCard
                  task={task}
                  submissions={[]}
                  subjectStudents={[]}
                  short
                  onClick={() => onTaskClick(type, task.id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : isLoading ? (
          <PageLoading />
        ) : (
          <Typography color="text.secondary">
            {t(`task:noItems.${type}`)}
          </Typography>
        )}
      </Box>
    </>
  );
}
