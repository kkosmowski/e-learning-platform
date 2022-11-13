import { useMemo } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SectionTitle from 'shared/components/SectionTitle';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useTasksQuery } from 'shared/queries';
import EditTaskForm from './components/EditTaskForm';

export default function EditTask() {
  const { subjectId, taskId } = useParams();
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('task');
  const {
    task: { task, update },
  } = useTasksQuery({ taskId });

  if (!subjectId) {
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
