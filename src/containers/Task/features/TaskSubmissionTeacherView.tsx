import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useGradesQuery, useTaskSubmissionsQuery } from 'shared/queries';
import { Task } from 'shared/types/task';
import PageLoading from 'shared/components/PageLoading';
import TaskSubmissionList from '../components/TaskSubmissionList';
import { Status } from '../../../shared/types/shared';
import { useMemo } from 'react';

interface TaskSubmissionTeacherViewProps {
  task: Task;
}

export default function TaskSubmissionTeacherView(
  props: TaskSubmissionTeacherViewProps
) {
  const { task } = props;
  const { taskSubmissions, isLoading, isSuccess } = useTaskSubmissionsQuery(
    task.id
  );
  const { bulkEvaluate } = useGradesQuery();
  const { t } = useTranslation('task');
  const allSubmissionsSent = useMemo(
    () =>
      taskSubmissions.filter(({ status }) => status !== Status.NOT_SUBMITTED)
        .length === taskSubmissions.length,
    [taskSubmissions]
  );

  if (isLoading) {
    return <PageLoading />;
  }

  if (isSuccess && !taskSubmissions.length) {
    return (
      <Typography color="text.secondary">{t('submissions.noItems')}</Typography>
    );
  }

  const handleEvaluateNotSubmitted = () => {
    // @todo: confirmation dialog
    bulkEvaluate(task.id);
  };

  if (isSuccess && taskSubmissions.length) {
    return (
      <>
        {task.mandatory && task.isFinished && !allSubmissionsSent && (
          <Button
            variant="contained"
            sx={{ alignSelf: 'flex-start' }}
            onClick={handleEvaluateNotSubmitted}
          >
            {t('submissions.gradeNotSubmittedWith', { grade: 1 })}
          </Button>
        )}

        <TaskSubmissionList
          submissions={taskSubmissions}
          isFinished={task.isFinished}
        />
      </>
    );
  }

  return null;
}
