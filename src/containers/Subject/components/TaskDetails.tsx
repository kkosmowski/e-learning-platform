import { Box, Stack, Tooltip, Typography } from '@mui/material';
import {
  AccessTime,
  CheckCircle,
  CheckCircleOutline,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';

import { Status } from 'shared/types/shared';
import { TaskWithSubmissions } from 'shared/types/task';
import { User } from 'shared/types/user';
import ItemCategory from '../../../shared/components/ItemCategory';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { isPastDate } from 'shared/utils/date.utils';
import TimeLeft from './TimeLeft';
import TaskStatus from './TaskStatus';

interface TaskDetailsProps {
  task: TaskWithSubmissions;
  currentUser: User;
  subjectStudents?: User[];
}

export default function TaskDetails(props: TaskDetailsProps) {
  const { task, currentUser } = props;
  const { t } = useTranslation('task');
  const isUserTeacher = isTeacher(currentUser);
  const isUserStudent = isStudent(currentUser);
  const status = task.submission?.status || Status.NOT_SUBMITTED;
  const isPastDeadline = isPastDate(task.endTime);

  return (
    <Typography
      component="aside"
      sx={{
        color: 'text.secondary',
        fontSize: 14,
      }}
    >
      <Stack spacing={0.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <ItemCategory type={task.type} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <AccessTime sx={{ fontSize: 16 }} />

          <Tooltip title={t('tooltip.startTime')}>
            <Typography component="span" sx={{ font: 'inherit' }}>
              {format(task.startTime, 'dd.MM.yyy HH:mm')}
            </Typography>
          </Tooltip>
        </Box>

        <TimeLeft
          task={task}
          isSubmitted={task.submission?.status !== Status.NOT_SUBMITTED}
        />

        {isUserStudent && (
          <TaskStatus status={status} isFinished={task.isFinished} />
        )}

        {isUserTeacher && task.received !== null && task.expected !== null && (
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
            {task.received === task.expected ? (
              <CheckCircle sx={{ fontSize: 16 }} color="success" />
            ) : (
              <CheckCircleOutline
                sx={{ fontSize: 16 }}
                color={isPastDeadline ? 'error' : 'warning'}
              />
            )}

            <span>{`${task.received} / ${task.expected}`}</span>
          </Box>
        )}
      </Stack>
    </Typography>
  );
}
