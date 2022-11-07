import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import TaskCard from 'shared/components/TaskCard';
import { Task, TaskType } from 'shared/types/task';
import { isTeacher } from 'shared/utils/user.utils';
import { VISIBLE_LATEST_TASKS } from 'shared/consts/task';
import { subjectStudents } from 'shared/consts/subject';
import { useAuth } from 'contexts/auth';

interface LatestTasksProps {
  type: TaskType;
  onTaskClick: (type: TaskType, taskId: string) => void;
  onMoreClick: (type: TaskType) => void;
  onCreateTask: (type: TaskType) => void;
}

export default function LatestTasks(props: LatestTasksProps) {
  const { type, onTaskClick, onMoreClick, onCreateTask } = props;
  const { t } = useTranslation('subject');
  const { currentUser } = useAuth();
  const isUserTeacher = isTeacher(currentUser);
  const tasks: Task[] = [];

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

        {isUserTeacher && (
          <TextButton sx={{ ml: 2 }} onClick={() => onCreateTask(type)}>
            {t(`createNew.${type}`)}
          </TextButton>
        )}
      </SectionTitle>

      <Box>
        {tasks.length ? (
          <Grid container spacing={2}>
            {tasks.slice(0, VISIBLE_LATEST_TASKS).map((task) => (
              <Grid item key={task.id} xs={12} md={6} lg={4}>
                {/*<TaskCard*/}
                {/*  task={task}*/}
                {/*  submissions={taskSubmissions.filter(*/}
                {/*    (submission) => submission.taskId === task.id*/}
                {/*  )}*/}
                {/*  subjectStudents={subjectStudents}*/}
                {/*  short*/}
                {/*  onClick={() => onTaskClick(type, task.id)}*/}
                {/*/>*/}
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
