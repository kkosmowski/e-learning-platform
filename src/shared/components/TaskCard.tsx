import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useMemo } from 'react';
import {
  AccessTime,
  CheckBox,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  CheckCircle,
  CheckCircleOutline,
  SvgIconComponent,
} from '@mui/icons-material';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import { Task, TaskSubmission } from 'shared/types/task';
import { Status } from 'shared/types/shared';
import { timeLeft } from 'shared/utils/date.utils';
import { getTimeLeftTextColor } from 'shared/utils/task.utils';
import ItemCategory from './ItemCategory';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { Role, User } from 'shared/types/user';
import ActionToolbar from './ActionToolbar';
import { useAuth } from 'contexts/auth';
import useCustomNavigate from '../../hooks/use-custom-navigate';
import toast from 'react-hot-toast';
import { deleteNotice } from '../../api/notice';

interface TaskCardProps {
  task: Task;
  submissions?: TaskSubmission[];
  subjectStudents?: User[];
  short?: boolean;
  onClick?: () => void;
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

export default function TaskCard(props: TaskCardProps) {
  const { task, submissions, subjectStudents, short, onClick } = props;
  const { t } = useTranslation('task');
  const { currentUser } = useAuth();
  const isUserTeacher = isTeacher(currentUser);
  const isUserStudent = isStudent(currentUser);
  const { navigate, back } = useCustomNavigate();

  const allStudentsSubmitted = useMemo(
    () =>
      isUserTeacher &&
      !!submissions &&
      !!subjectStudents &&
      submissions.length === subjectStudents.length,
    [isUserTeacher, submissions, subjectStudents]
  );

  let timeLeftString = '';
  let diffInMinutes = 0;
  let timeLeftTextColor = '';

  const TitleWrapper = isUserTeacher ? Box : Fragment;
  const TitleWrapperProps = isUserTeacher
    ? { sx: { display: 'flex', justifyContent: 'space-between' } }
    : {};

  if ((isUserStudent && task.status === Status.Todo) || isUserTeacher) {
    [timeLeftString, diffInMinutes] = timeLeft(t, task.endTime);
    timeLeftTextColor = getTimeLeftTextColor(task.type, diffInMinutes);
  }
  const StatusIcon = getStatusIcon(task.status);
  const CardWrapper = onClick ? CardActionArea : Fragment;

  const isAuthor = useMemo(
    () =>
      currentUser?.role === Role.Teacher &&
      currentUser.id === task.createdBy?.id,
    [currentUser, task.createdBy]
  );
  const isEditAllowed = useMemo(() => !short && isAuthor, [short, isAuthor]);

  const handleEdit = () => {
    navigate('./edit');
  };

  const handleDelete = () => {
    // @todo implement delete
  };

  return (
    <Card {...(onClick && { onClick })}>
      <CardWrapper
        {...(onClick && {
          sx: { flexDirection: 'column', alignItems: 'stretch' },
        })}
      >
        <CardContent component="article">
          <TitleWrapper {...TitleWrapperProps}>
            <Typography component="h3" {...(!short && { variant: 'h3' })}>
              {task.name}
            </Typography>

            <ActionToolbar
              item={['task', task.name]}
              isEditAllowed={isEditAllowed}
              isPreview={Boolean(short)}
              share
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TitleWrapper>

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
                <ItemCategory type={task.type} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                <AccessTime sx={{ fontSize: 16 }} />
                <Typography
                  component="span"
                  sx={{ font: 'inherit' }}
                  color={
                    (isUserTeacher && timeLeftTextColor) || 'text.secondary'
                  }
                >
                  {format(task.endTime, 'dd.MM.yyy HH:mm')}
                </Typography>
                {task.status === Status.Todo &&
                  isUserStudent &&
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

              {isUserStudent && (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
                >
                  <StatusIcon sx={{ fontSize: 16 }} />
                  <span>{t(`statuses.${task.status}`)}</span>
                </Box>
              )}

              {isUserTeacher && submissions && subjectStudents && (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
                >
                  {allStudentsSubmitted ? (
                    <CheckCircle sx={{ fontSize: 16 }} color="success" />
                  ) : (
                    <CheckCircleOutline
                      sx={{ fontSize: 16 }}
                      color={diffInMinutes <= 0 ? 'error' : 'warning'}
                    />
                  )}
                  <span>
                    {submissions.length} / {subjectStudents.length}
                  </span>
                </Box>
              )}
            </Stack>
          </Typography>
        </CardContent>
      </CardWrapper>
    </Card>
  );
}
