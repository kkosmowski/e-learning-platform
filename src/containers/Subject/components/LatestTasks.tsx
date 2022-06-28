import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import TaskCard from 'shared/components/TaskCard';
import { Task, TaskType } from 'shared/types/task';

interface LatestTasksProps {
  tasks: Task[];
  type: TaskType;
  onTaskClick: (type: TaskType, taskId: string) => void;
  onMoreClick: (type: TaskType) => void;
}

export default function LatestTasks(props: LatestTasksProps) {
  const { tasks, type, onTaskClick, onMoreClick } = props;
  const { t } = useTranslation('subject');

  return (
    <>
      <SectionTitle>
        <span>
          {type === TaskType.Task
            ? t('general.latestTasks')
            : t('general.latestHomework')}
        </span>

        {!!tasks.length && (
          <TextButton sx={{ ml: 2 }} onClick={() => onMoreClick(type)}>
            {t('common:viewMore')}
          </TextButton>
        )}
      </SectionTitle>

      <Box>
        {tasks.length ? (
          <Grid container spacing={2}>
            {tasks.map((task) => (
              <Grid item key={task.id} xs={12} md={6} lg={4}>
                <TaskCard
                  task={task}
                  short
                  onClick={() => onTaskClick(type, task.id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary">{t('common:noTasks')}</Typography>
        )}
      </Box>
    </>
  );
}
