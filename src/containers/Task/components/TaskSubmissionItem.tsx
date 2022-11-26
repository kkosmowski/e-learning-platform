import { Box, Link, styled, Stack, Typography } from '@mui/material';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import { TaskSubmission } from 'shared/types/task';

interface TaskSubmissionItemProps {
  taskSubmission: TaskSubmission;
}

export default function TaskSubmissionItem(props: TaskSubmissionItemProps) {
  const { taskSubmission } = props;
  const { t } = useTranslation('task');

  return (
    <Stack>
      <Box component="section">
        <Typography component="h4" color="text.secondary">
          {t('submissions.message')}
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
            {t('submissions.attachedFile')}
          </Typography>

          <Link
            href={taskSubmission.fileUrl}
            target="_blank"
            rel="noreferrer"
            sx={{ display: 'inline-block', p: 1 }}
          >
            {t('submissions.downloadFile')}
          </Link>
        </Box>
      )}

      <Typography color="text.secondary" sx={{ mt: 3, fontSize: 14 }}>
        {t('submissions.sentOn')}{' '}
        <time dateTime={taskSubmission.createdAt.toISOString()}>
          {format(taskSubmission.createdAt, 'dd-MM-yyyy HH:mm')}
        </time>
      </Typography>
    </Stack>
  );
}

const Quote = styled('blockquote')(({ theme }) => ({
  padding: '8px 12px',
  margin: '12px 24px',
  boxShadow: `-5px 0 0 ${theme.palette.secondary.light}`,
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
}));
