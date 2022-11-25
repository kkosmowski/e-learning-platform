import { Box, Tooltip, Typography } from '@mui/material';
import { LockClock } from '@mui/icons-material';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import { Status } from 'shared/types/shared';
import { SimpleTaskSubmission, Task } from 'shared/types/task';
import { timeLeft } from 'shared/utils/date.utils';
import { getTimeLeftTextColor } from 'shared/utils/task.utils';

interface TimeLeftProps {
  task: Task;
  taskSubmission?: SimpleTaskSubmission;
}

export default function TimeLeft(props: TimeLeftProps) {
  const { task, taskSubmission } = props;
  const { t } = useTranslation('task');

  const [timeLeftString, diffInMinutes] = timeLeft(t, task.endTime);
  const isSubmitted = taskSubmission?.status !== Status.NOT_SUBMITTED;
  const timeLeftTextColor = getTimeLeftTextColor(
    task.type,
    diffInMinutes,
    isSubmitted
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
      <LockClock sx={{ fontSize: 16 }} />

      <Tooltip title={t('tooltip.endTime')}>
        <Typography
          component="span"
          sx={{ font: 'inherit' }}
          color={timeLeftTextColor}
        >
          {format(task.endTime, 'dd.MM.yyy HH:mm')}
        </Typography>
      </Tooltip>

      {timeLeftTextColor && timeLeftString && (
        <Typography color={timeLeftTextColor} sx={{ fontSize: 'inherit' }}>
          ({timeLeftString})
        </Typography>
      )}
    </Box>
  );
}
