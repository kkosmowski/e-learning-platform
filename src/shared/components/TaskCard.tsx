import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import {
  AccessTime,
  Assignment,
  CheckBox,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  SvgIconComponent,
} from '@mui/icons-material';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import { Task, TaskStatus, TaskType } from 'shared/types/task';
import { timeLeft } from 'shared/utils/date.utils';
import { getTimeLeftTextColor } from 'shared/utils/task.utils';

interface TaskCardProps {
  task: Task;
  short?: boolean;
  onClick?: () => void;
}

const getStatusIcon = (status: TaskStatus): SvgIconComponent => {
  switch (status) {
    case TaskStatus.Todo:
      return CheckBoxOutlineBlank;
    case TaskStatus.Submitted:
      return CheckBoxOutlined;
    case TaskStatus.Graded:
      return CheckBox;
  }
};

export default function TaskCard(props: TaskCardProps) {
  const { task, short, onClick } = props;
  const { t } = useTranslation('task');

  let timeLeftString = '';
  let diffInMinutes = 0;
  let timeLeftTextColor = '';

  if (task.status === TaskStatus.Todo) {
    [timeLeftString, diffInMinutes] = timeLeft(t, new Date(task.deadline));
    timeLeftTextColor = getTimeLeftTextColor(task.type, diffInMinutes);
  }
  const StatusIcon = getStatusIcon(task.status);
  const CardWrapper = onClick ? CardActionArea : Fragment;

  return (
    <Card {...(onClick && { onClick })}>
      <CardWrapper>
        <CardContent component="article" sx={{ width: '100%' }}>
          <Typography component="h3" {...(!short && { variant: 'h3' })}>
            {task.title}
          </Typography>

          <Divider sx={{ my: short ? 1 : 2 }} />

          {!short && (
            <>
              <Typography
                color="text.secondary"
                sx={{ whiteSpace: 'pre-wrap' }}
              >
                {task.content}
              </Typography>

              <Divider sx={{ my: 2 }} />
            </>
          )}

          <Typography
            component="aside"
            sx={{
              color: 'text.secondary',
              fontSize: 14,
            }}
          >
            <Stack spacing={0.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                <Assignment sx={{ fontSize: 16 }} />
                <span>
                  {task.type === TaskType.Task ? t('task') : t('homework')}
                </span>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                <AccessTime sx={{ fontSize: 16 }} />
                <span>
                  {format(new Date(task.deadline), 'dd.MM.yyy HH:mm')}
                </span>
                {task.status === TaskStatus.Todo &&
                  timeLeftTextColor &&
                  timeLeftString && (
                    <Typography
                      color={timeLeftTextColor}
                      sx={{ fontSize: 'inherit' }}
                    >
                      ({timeLeftString})
                    </Typography>
                  )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                <StatusIcon sx={{ fontSize: 16 }} />
                <span>{t(`statuses.${task.status}`)}</span>
              </Box>
            </Stack>
          </Typography>
        </CardContent>
      </CardWrapper>
    </Card>
  );
}
