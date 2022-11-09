import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

import { TaskSubmission } from 'shared/types/task';
import PageLoading from 'shared/components/PageLoading';

interface TaskSubmissionListProps {
  submissions: TaskSubmission[];
}

export default function TaskSubmissionList(props: TaskSubmissionListProps) {
  const { submissions } = props;
  const isSuccess = true;
  const isLoading = false;
  const { t } = useTranslation('task');

  return (
    <Card>
      <CardContent>
        <Stack>
          {isSuccess && submissions?.length ? (
            submissions.map((submission) => (
              <Box key={submission.id}>
                {submission.taskId}, {submission.status}, {submission.studentId}
              </Box>
            ))
          ) : isLoading ? (
            <PageLoading />
          ) : (
            <Typography color="text.secondary">
              {t('submissions.noItems')}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
