import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import { Fragment, useMemo } from 'react';

import { Task, TaskSubmission } from 'shared/types/task';
import { isTeacher } from 'shared/utils/user.utils';
import { Role, User } from 'shared/types/user';
import ActionToolbar from './ActionToolbar';
import { useAuth } from 'contexts/auth';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { TASK_VISIBLE_SHORT_TITLE_LENGTH } from 'shared/consts/task';
import TaskDetails from './TaskDetails';
import { isPastDate } from '../utils/date.utils';

interface TaskCardProps {
  task: Task;
  submissions?: TaskSubmission[];
  subjectStudents?: User[];
  short?: boolean;
  onClick?: () => void;
}

export default function TaskCard(props: TaskCardProps) {
  const { task, submissions, subjectStudents, short, onClick } = props;
  const { currentUser } = useAuth();
  const isUserTeacher = isTeacher(currentUser);
  const { navigate } = useCustomNavigate();

  const TitleWrapper = isUserTeacher ? Box : Fragment;
  const TitleWrapperProps = isUserTeacher
    ? { sx: { display: 'flex', justifyContent: 'space-between' } }
    : {};

  const CardWrapper = onClick ? CardActionArea : Fragment;

  const isAuthor = useMemo(
    () =>
      currentUser?.role === Role.Teacher &&
      currentUser.id === task.createdBy?.id,
    [currentUser, task.createdBy]
  );
  const isEditVisible = useMemo(() => !short && isAuthor, [short, isAuthor]);

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
            <Tooltip
              title={
                short && task.name.length > TASK_VISIBLE_SHORT_TITLE_LENGTH
                  ? task.name
                  : ''
              }
            >
              <Typography
                component="h3"
                {...(short
                  ? {
                      sx: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    }
                  : { variant: 'h3' })}
              >
                {task.name}
              </Typography>
            </Tooltip>

            <ActionToolbar
              item={['task', task.name]}
              isEditVisible={isEditVisible}
              isEditAllowed={!isPastDate(task.endTime)}
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

          {!!currentUser && !!task && (
            <TaskDetails
              task={task}
              currentUser={currentUser}
              submissions={submissions}
              subjectStudents={subjectStudents}
            />
          )}
        </CardContent>
      </CardWrapper>
    </Card>
  );
}
