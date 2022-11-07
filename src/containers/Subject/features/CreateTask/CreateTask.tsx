import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { TaskType } from 'shared/types/task';
import SectionTitle from 'shared/components/SectionTitle';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useTaskForm } from 'shared/hooks/use-task-form';
import { useCreateTaskQuery } from 'shared/hooks/use-create-task-query';

interface CreateTaskProps {
  type: TaskType;
}

export default function CreateTask(props: CreateTaskProps) {
  const { type } = props;
  const { subjectId } = useParams();
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('task');
  const createTask = useCreateTaskQuery();

  if (!subjectId) {
    navigate('/404');
  }

  const { Form } = useTaskForm({
    type,
    initialValues: {
      subjectId: subjectId || '',
      mandatory: true,
      type,
      name: '',
      content: '',
      startTime: null,
      endTime: null,
    },
    submitButtonLabel: t('common:create'),
    onSubmit: createTask,
    t,
  });

  return (
    <>
      <SectionTitle>{t(`create.title.${type}`)}</SectionTitle>

      <Card>
        <CardContent>{Form}</CardContent>
      </Card>
    </>
  );
}
