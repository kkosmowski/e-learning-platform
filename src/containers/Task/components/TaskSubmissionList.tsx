import { Card, CardContent, Stack } from '@mui/material';
import { TaskSubmission } from 'shared/types/task';
import { Box } from '@mui/system';

interface TaskSubmissionListProps {
  submissions: TaskSubmission[];
}

export default function TaskSubmissionList(props: TaskSubmissionListProps) {
  const { submissions } = props;

  return (
    <Card>
      <CardContent>
        <Stack>
          {submissions.map((submission) => (
            <Box key={submission.id}>
              {submission.taskId}, {submission.status}, {submission.studentId}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
