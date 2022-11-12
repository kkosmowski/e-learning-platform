import { useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  CheckCircle,
  CheckCircleOutline,
  SvgIconComponent,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { Status } from 'shared/types/shared';
import { Task, TaskSubmission } from 'shared/types/task';
import { User } from 'shared/types/user';
import ItemCategory from './ItemCategory';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { isPastDate } from 'shared/utils/date.utils';
import TimeLeft from './TimeLeft';

interface TaskDetailsProps {
  task: Task;
  currentUser: User;
  submissions?: TaskSubmission[];
  subjectStudents?: User[];
}

const getStatusIcon = (status: Status): SvgIconComponent => {
  switch (status) {
    case Status.Todo:
      return CheckBoxOutlineBlank;
    case Status.Submitted:
      return CheckBoxOutlined;
    case Status.Graded:
      return CheckBox;
  }
};

export default function TaskDetails(props: TaskDetailsProps) {
  const { task, currentUser, submissions = [], subjectStudents = [] } = props;
  const { t } = useTranslation('task');
  const isUserTeacher = isTeacher(currentUser);
  const isUserStudent = isStudent(currentUser);
  const StatusIcon = getStatusIcon(task.status);
  const isPastDeadline = isPastDate(task.endTime);

  const allStudentsSubmitted = useMemo(
    () =>
      isUserTeacher &&
      !!submissions &&
      !!subjectStudents &&
      submissions.length === subjectStudents.length,
    [isUserTeacher, submissions, subjectStudents]
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

        <TimeLeft task={task} currentUser={currentUser} />

        {isUserStudent && (
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
            <StatusIcon sx={{ fontSize: 16 }} />
            <span>{t(`statuses.${task.status}`)}</span>
          </Box>
        )}

        {isUserTeacher && submissions && subjectStudents && (
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
            {allStudentsSubmitted ? (
              <CheckCircle sx={{ fontSize: 16 }} color="success" />
            ) : (
              <CheckCircleOutline
                sx={{ fontSize: 16 }}
                color={isPastDeadline ? 'error' : 'warning'}
              />
            )}

            <span>
              {submissions.length} / {subjectStudents.length}
            </span>
          </Box>
        )}
      </Stack>
    </Typography>
  );
}
