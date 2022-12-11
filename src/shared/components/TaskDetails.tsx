import { useMemo } from 'react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import {
  AccessTime,
  CheckBox,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  CheckCircle,
  CheckCircleOutline,
  SvgIconComponent,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';

import { Status } from 'shared/types/shared';
import { Task, SimpleTaskSubmission } from 'shared/types/task';
import { User } from 'shared/types/user';
import ItemCategory from './ItemCategory';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { isPastDate } from 'shared/utils/date.utils';
import TimeLeft from './TimeLeft';

interface TaskDetailsProps {
  task: Task;
  currentUser: User;
  submissions?: SimpleTaskSubmission[];
  subjectStudents?: User[];
}

const getStatusIcon = (status: Status): SvgIconComponent => {
  switch (status) {
    case Status.NOT_SUBMITTED:
      return CheckBoxOutlineBlank;
    case Status.SUBMITTED:
      return CheckBoxOutlined;
    case Status.GRADED:
      return CheckBox;
  }
};

const statusColors: Record<Status, string> = {
  [Status.NOT_SUBMITTED]: '',
  [Status.SUBMITTED]: 'text.info',
  [Status.GRADED]: 'text.success',
};

export default function TaskDetails(props: TaskDetailsProps) {
  const { task, currentUser, submissions = [], subjectStudents = [] } = props;
  const { t } = useTranslation('task');
  const isUserTeacher = isTeacher(currentUser);
  const isUserStudent = isStudent(currentUser);
  const status = submissions[0]?.status || Status.NOT_SUBMITTED;
  const statusColor = statusColors[status];
  const StatusIcon = isUserStudent && getStatusIcon(status);
  const isPastDeadline = isPastDate(task.endTime);

  const sentSubmissions = useMemo(
    () => submissions.filter(({ createdAt }) => !!createdAt),
    [submissions]
  );

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

        <TimeLeft task={task} taskSubmission={submissions[0]} />

        {StatusIcon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: 1,
              color: statusColor,
            }}
          >
            <StatusIcon sx={{ fontSize: 16 }} />
            <span>{t(`statuses.${status}`)}</span>
          </Box>
        )}

        {isUserTeacher && submissions && subjectStudents && (
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
            {sentSubmissions.length === submissions.length ? (
              <CheckCircle sx={{ fontSize: 16 }} color="success" />
            ) : (
              <CheckCircleOutline
                sx={{ fontSize: 16 }}
                color={isPastDeadline ? 'error' : 'warning'}
              />
            )}

            <span>{`${sentSubmissions.length} / ${submissions.length}`}</span>
          </Box>
        )}
      </Stack>
    </Typography>
  );
}
