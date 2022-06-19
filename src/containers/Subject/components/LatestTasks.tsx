import { Box, Grid, Typography } from '@mui/material';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import TaskCard from 'shared/components/TaskCard';
import { Task } from 'shared/types/task';
import { useTranslation } from 'react-i18next';

interface LatestTasksProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  onMoreClick: () => void;
}

export default function LatestTasks(props: LatestTasksProps) {
  const { tasks, onTaskClick, onMoreClick } = props;
  const { t } = useTranslation('subject');

  return (
    <>
      <SectionTitle>
        <span>{t('general.latestTasks')}</span>

        {!!tasks.length && (
          <TextButton sx={{ ml: 2 }} onClick={onMoreClick}>
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
                  onClick={() => onTaskClick(task.id)}
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
