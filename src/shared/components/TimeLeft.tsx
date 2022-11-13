import { Box, Tooltip, Typography } from '@mui/material';
import { LockClock } from '@mui/icons-material';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import { Status } from 'shared/types/shared';
import { User } from 'shared/types/user';
import { Task } from 'shared/types/task';
import { timeLeft } from 'shared/utils/date.utils';
import { getTimeLeftTextColor } from 'shared/utils/task.utils';
import { isStudent, isTeacher } from 'shared/utils/user.utils';

interface TimeLeftProps {
  task: Task;
  currentUser: User;
}

export default function TimeLeft(props: TimeLeftProps) {
  const { task, currentUser } = props;
  const { t } = useTranslation('task');
  const isUserTeacher = isTeacher(currentUser);
  const isUserStudent = isStudent(currentUser);

  let diffInMinutes = 0;
  let timeLeftString = '';
  let timeLeftTextColor = '';

  if ((isUserStudent && task.status === Status.Todo) || isUserTeacher) {
    [timeLeftString, diffInMinutes] = timeLeft(t, task.endTime);
    timeLeftTextColor = getTimeLeftTextColor(task.type, diffInMinutes);
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
      <LockClock sx={{ fontSize: 16 }} />

      <Tooltip title={t('tooltip.endTime')}>
        <Typography
          component="span"
          sx={{ font: 'inherit' }}
          color={(isUserTeacher && timeLeftTextColor) || 'text.secondary'}
        >
          {format(task.endTime, 'dd.MM.yyy HH:mm')}
        </Typography>
      </Tooltip>

      {task.status === Status.Todo && timeLeftTextColor && timeLeftString && (
        <Typography color={timeLeftTextColor} sx={{ fontSize: 'inherit' }}>
          ({timeLeftString})
        </Typography>
      )}
    </Box>
  );
}
