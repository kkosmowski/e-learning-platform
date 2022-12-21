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
import { useNavigate } from 'react-router-dom';

import { TaskWithSubmissions, SimpleTaskSubmission } from 'shared/types/task';
import { isPastDate } from 'shared/utils/date.utils';
import { Role, User } from 'shared/types/user';
import ActionToolbar from './ActionToolbar';
import { useAuth } from 'contexts/auth';
import { TASK_VISIBLE_SHORT_TITLE_LENGTH } from 'shared/consts/task';
import TaskDetails from './TaskDetails';

interface TaskCardProps {
  task: TaskWithSubmissions;
  submissions?: SimpleTaskSubmission[];
  subjectStudents?: User[];
  short?: boolean;
  onClick?: () => void;
  onFinishNow?: () => void;
  onDelete?: () => void;
}

export default function TaskCard(props: TaskCardProps) {
  const {
    task,
    submissions,
    subjectStudents,
    short,
    onClick,
    onFinishNow,
    onDelete,
  } = props;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    onDelete && onDelete();
  };

  return (
    <Card {...(onClick && { onClick })}>
      <CardWrapper
        {...(onClick && {
          sx: { flexDirection: 'column', alignItems: 'stretch' },
        })}
      >
        <CardContent component="article">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              isDeleteAllowed={!isPastDate(task.canBeDeletedBefore)}
              isPreview={Boolean(short)}
              finishNow={isPastDate(task.startTime)}
              share
              onFinishNow={onFinishNow}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Box>

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
              subjectStudents={subjectStudents}
            />
          )}
        </CardContent>
      </CardWrapper>
    </Card>
  );
}
