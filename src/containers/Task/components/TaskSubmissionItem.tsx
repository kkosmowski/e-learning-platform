import { Task, TaskSubmission } from 'shared/types/task';
import {
  Box,
  Card,
  CardContent,
  Link,
  styled,
  Typography,
} from '@mui/material';
import format from 'date-fns/format';

interface TaskSubmissionItemProps {
  task: Task;
  taskSubmission: TaskSubmission;
}

export default function TaskSubmissionItem(props: TaskSubmissionItemProps) {
  const { task, taskSubmission } = props;

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box component="section">
          <Typography component="h4" color="text.secondary">
            Wiadomość
          </Typography>
          {taskSubmission.comment ? (
            <Quote>{taskSubmission.comment}</Quote>
          ) : (
            <Typography component="em">brak</Typography>
          )}
        </Box>

        {taskSubmission.fileUrl && (
          <Box component="section" sx={{ mt: 2 }}>
            <Typography component="h4" color="text.secondary">
              Załączony plik
            </Typography>

            <Link
              href={taskSubmission.fileUrl}
              target="_blank"
              rel="noreferrer"
              sx={{ display: 'inline-block', p: 1 }}
            >
              Pobierz
            </Link>
          </Box>
        )}

        <Typography color="text.secondary" sx={{ mt: 3 }}>
          Wysłano{' '}
          <time dateTime={taskSubmission.createdAt.toISOString()}>
            {format(taskSubmission.createdAt, 'dd-MM-yyyy HH:mm')}
          </time>
        </Typography>
      </CardContent>
    </Card>
  );
}

const Quote = styled('blockquote')(({ theme }) => ({
  padding: '8px 12px',
  margin: '12px 24px',
  boxShadow: `-5px 0 0 ${theme.palette.secondary.light}`,
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
}));
