import { useParams } from 'react-router';
import { useState } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { Status } from 'shared/types/shared';
import { isPastDate } from 'shared/utils/date.utils';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import TaskAnswerForm from './components/TaskAnswerForm';
import TaskSubmissionList from './components/TaskSubmissionList';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useAuth } from 'contexts/auth';
import { useTasksQuery, useTaskSubmissionQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';

export default function Task() {
  const { navigate } = useCustomNavigate();
  const { subjectId, taskId } = useParams();
  const { t } = useTranslation('task');
  const [isSubmitFormVisible, setIsSubmitFormVisible] = useState(false);
  const { currentUser } = useAuth();
  const isUserStudent = isStudent(currentUser);
  const isUserTeacher = isTeacher(currentUser);
  const {
    task: { task, update, deleteTask, isLoading, isSuccess },
  } = useTasksQuery({ taskId });
  const {
    taskSubmission,
    isLoading: isSubmissionLoading,
    isSuccess: isSubmissionSuccess,
  } = useTaskSubmissionQuery(taskId);
  const hasAlreadySubmitted = Boolean(
    taskSubmission?.status !== Status.NOT_SUBMITTED
  );

  if (!isLoading && !task) {
    navigate('/404');
    return null;
  }

  const isPastDeadline = !!task && isPastDate(new Date(task.endTime));

  const handleFinishNow = (): void => {
    if (!subjectId || !taskId) return;
    update({ endTime: new Date() });
  };

  const handleAnswerSubmit = (): void => {
    console.log('submitted');
  };

  const handleDelete = (): void => {
    if (!subjectId || !taskId) return;
    deleteTask(taskId);
  };

  return (
    <Centered innerSx={{ gap: 2 }}>
      {isSuccess && task ? (
        <>
          <TaskCard
            task={task}
            submissions={taskSubmission ? [taskSubmission] : []}
            onFinishNow={handleFinishNow}
            onDelete={handleDelete}
          />

          {isUserStudent &&
            taskSubmission?.status === Status.NOT_SUBMITTED &&
            !isSubmitFormVisible && (
              <Box>
                <Tooltip
                  title={
                    isPastDeadline ? t('tooltip.cannotSubmitPastDeadline') : ''
                  }
                >
                  <span>
                    <Button
                      variant="contained"
                      disabled={isPastDeadline || hasAlreadySubmitted}
                      onClick={() => setIsSubmitFormVisible(true)}
                    >
                      {t('submitSolution')}
                    </Button>
                  </span>
                </Tooltip>
              </Box>
            )}

          {isUserStudent && (
            <>
              {isSubmitFormVisible && (
                <TaskAnswerForm
                  task={task}
                  onCancel={() => setIsSubmitFormVisible(false)}
                  onSubmit={handleAnswerSubmit}
                />
              )}

              {hasAlreadySubmitted && !!taskSubmission && (
                <>
                  {'<TASK SUBMISSION>'}
                  {/*<TaskSubmissionItem taskSubmission={ taskSubmission } />*/}
                </>
              )}
            </>
          )}

          {isUserTeacher && <TaskSubmissionList submissions={[]} />}
        </>
      ) : isLoading ? (
        <PageLoading />
      ) : null}
    </Centered>
  );
}
