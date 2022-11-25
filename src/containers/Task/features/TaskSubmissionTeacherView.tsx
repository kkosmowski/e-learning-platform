import { useTaskSubmissionsQuery } from 'shared/queries';
import { Task } from 'shared/types/task';
import TaskSubmissionList from '../components/TaskSubmissionList';
import PageLoading from '../../../shared/components/PageLoading';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('task');

  if (isLoading) {
    return <PageLoading />;
  }

  if (isSuccess && !taskSubmissions.length) {
    return (
      <Typography color="text.secondary">{t('submissions.noItems')}</Typography>
    );
  }

  if (isSuccess && taskSubmissions.length) {
    return <TaskSubmissionList submissions={taskSubmissions} />;
  }

  return null;
}
