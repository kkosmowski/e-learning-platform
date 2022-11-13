import { useTranslation } from 'react-i18next';

import { useTaskForm } from 'shared/hooks';
import { TaskForm } from 'shared/types/task';

interface EditTaskFormProps {
  initialValues: TaskForm;
  onSubmit: (form: TaskForm) => void;
}

export default function EditTaskForm(props: EditTaskFormProps) {
  const { initialValues, onSubmit } = props;
  const { t } = useTranslation('task');

  const { Form } = useTaskForm({
    type: initialValues.type,
    initialValues,
    submitButtonLabel: t('common:edit'),
    onSubmit,
    t,
  });

  return Form;
}
