import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Link, styled, Stack, Typography, Button } from '@mui/material';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import { TaskSubmission, TaskEvaluationDialogData } from 'shared/types/task';
import TaskEvaluationDialog from './TaskEvaluationDialog';

interface TaskSubmissionItemProps {
  taskSubmission: TaskSubmission;
  teacherView?: boolean;
}

export default function TaskSubmissionItem(props: TaskSubmissionItemProps) {
  const { taskSubmission, teacherView } = props;
  const { subjectId } = useParams();
  const [evaluationOpened, setEvaluationOpened] = useState(false);
  const [taskEvaluationDialogData, setTaskEvaluationDialogData] = useState<
    TaskEvaluationDialogData | undefined
  >();
  const { t } = useTranslation('task');

  const openEvaluationDialog = () => {
    if (teacherView && subjectId) {
      setTaskEvaluationDialogData({
        subjectId,
        taskId: taskSubmission.taskId,
        studentId: taskSubmission.createdBy.id,
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
          {taskSubmission.comment ? (
            <Quote>{taskSubmission.comment}</Quote>
          ) : (
            <Typography component="em">brak</Typography>
          )}
        </Box>

        {taskSubmission.fileUrl && (
          <Box component="section">
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

        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {t('submissions.sentOn')}{' '}
          <time dateTime={taskSubmission.createdAt.toISOString()}>
            {format(taskSubmission.createdAt, 'dd-MM-yyyy HH:mm')}
          </time>
        </Typography>

        {teacherView && (
          <Button
            onClick={openEvaluationDialog}
            sx={{ alignSelf: 'flex-end' }}
            variant="contained"
          >
            {t('submissions.evaluate')}
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
