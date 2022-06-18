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

import { Task, TaskStatus } from 'shared/types/task';

interface TaskCardProps {
  task: Task;
  short?: boolean;
  onClick?: () => void;
}

const getStatus = (status: TaskStatus): [SvgIconComponent, string] => {
  switch (status) {
    case TaskStatus.Todo:
      return [CheckBoxOutlineBlank, 'To be submitted'];
    case TaskStatus.Submitted:
      return [CheckBoxOutlined, 'Submitted'];
    case TaskStatus.Graded:
      return [CheckBox, 'Graded'];
  }
};

export default function TaskCard(props: TaskCardProps) {
  const { task, short, onClick } = props;

  const [StatusIcon, statusText] = getStatus(task.status);
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
                <Assignment sx={{ fontSize: 16 }} /> <span>Task</span>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                <AccessTime sx={{ fontSize: 16 }} />{' '}
                <span>
                  {format(new Date(task.deadline), 'dd.MM.yyy HH:mm')}
                </span>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                <StatusIcon sx={{ fontSize: 16 }} /> <span>{statusText}</span>
              </Box>
            </Stack>
          </Typography>
        </CardContent>
      </CardWrapper>
    </Card>
  );
}
