import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Link, Stack, styled, Typography } from '@mui/material';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import {
  SimpleTaskSubmission,
  TaskEvaluationDialogData,
  TaskSubmission,
} from 'shared/types/task';
import TaskEvaluationDialog from './TaskEvaluationDialog';
import { Status } from 'shared/types/shared';
import { isTaskSubmission } from 'shared/utils/task.utils';

interface TaskSubmissionItemProps {
  submission: SimpleTaskSubmission | TaskSubmission;
  pastDeadline?: boolean;
  teacherView?: boolean;
}

export default function TaskSubmissionItem(props: TaskSubmissionItemProps) {
  const { submission, pastDeadline, teacherView } = props;
  const { subjectId } = useParams();
  const [evaluationOpened, setEvaluationOpened] = useState(false);
  const [taskEvaluationDialogData, setTaskEvaluationDialogData] = useState<
    TaskEvaluationDialogData | undefined
  >();
  const { t } = useTranslation('task');
  const { status } = submission;

  const openEvaluationDialog = () => {
    if (teacherView && subjectId && isTaskSubmission(submission)) {
      setTaskEvaluationDialogData({
        subjectId,
        taskId: submission.taskId,
        studentId: submission.createdBy.id,
        suggestedGrade:
          pastDeadline && submission.status === Status.NOT_SUBMITTED ? 1 : 0,
      });
      setEvaluationOpened(true);
    }
  };

  const closeEvaluationDialog = () => {
    setEvaluationOpened(false);
  };

  return (
    <>
      <Stack spacing={3} sx={{ pt: 2 }}>
        <Box component="section">
          <Typography component="h4" color="text.secondary">
            {t('submissions.message')}
          </Typography>
          {submission.comment ? (
            <Quote>{submission.comment}</Quote>
          ) : (
            <Typography component="em">{t('submissions.noMessage')}</Typography>
          )}
        </Box>

        {submission.fileUrl && (
          <Box component="section">
            <Typography component="h4" color="text.secondary">
              {t('submissions.attachedFile')}
            </Typography>

            <Link
              href={submission.fileUrl}
              target="_blank"
              rel="noreferrer"
              sx={{ display: 'inline-block', p: 1 }}
            >
              {t('submissions.downloadFile')}
            </Link>
          </Box>
        )}

        {submission.createdAt && (
          <Typography color="text.secondary" sx={{ fontSize: 14 }}>
            {t('submissions.sentOn')}{' '}
            <time dateTime={submission.createdAt.toISOString()}>
              {format(submission.createdAt, 'dd-MM-yyyy HH:mm')}
            </time>
          </Typography>
        )}

        {teacherView && (
          <Button
            onClick={openEvaluationDialog}
            sx={{ alignSelf: 'flex-end' }}
            variant="contained"
            disabled={status === Status.GRADED}
          >
            {t(
              status === Status.GRADED
                ? 'submissions.alreadyEvaluated'
                : 'submissions.evaluate'
            )}
          </Button>
        )}
      </Stack>
      {evaluationOpened && (
        <TaskEvaluationDialog
          open
          data={taskEvaluationDialogData}
          onClose={closeEvaluationDialog}
        />
      )}
    </>
  );
}

const Quote = styled('blockquote')(({ theme }) => ({
  padding: '8px 12px',
  margin: '12px 24px',
  boxShadow: `-5px 0 0 ${theme.palette.secondary.light}`,
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
}));
