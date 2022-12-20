import { useMemo } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import SectionTitle from 'shared/components/SectionTitle';
import { useAuth } from 'contexts/auth';
import { useTasksQuery } from 'shared/queries';
import EditTaskForm from './components/EditTaskForm';

export default function EditTask() {
  const { subjectId, taskId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('task');
  const {
    task: { task, update },
  } = useTasksQuery({ taskId });
  const { currentUser } = useAuth();

  if (
    !subjectId ||
    !task ||
    task.isFinished ||
    task.createdBy.id !== currentUser?.id
  ) {
    navigate('/404');
  }

  const initialValues = useMemo(
    () =>
      task && subjectId
        ? {
            subjectId: subjectId,
            mandatory: task.mandatory,
            type: task.type,
            name: task.name,
            content: task.content,
            startTime: task.startTime,
            endTime: task.endTime,
          }
        : null,
    [task, subjectId]
  );

  return (
    <>
      <SectionTitle>
        {!!task?.type && t(`edit.title.${task.type}`)}
      </SectionTitle>

      <Card>
        <CardContent>
          {initialValues ? (
            <EditTaskForm initialValues={initialValues} onSubmit={update} />
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
