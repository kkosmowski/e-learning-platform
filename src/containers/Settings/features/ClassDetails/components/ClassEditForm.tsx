import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import { Class, ClassForm } from 'shared/types/class';
import { useClassForm } from 'shared/hooks';

interface ClassEditFormProps {
  class: Class;
  error: string;
  onSubmit: (form: ClassForm) => void;
  onCancel: () => void;
}

export default function ClassEditForm(props: ClassEditFormProps) {
  const { class: currentClass, error, onSubmit, onCancel } = props;
  const { t } = useTranslation('settings');
  const { Form } = useClassForm({
    initialValues: {
      name: currentClass.name,
      teacher: currentClass.teacher,
      students: currentClass.students,
    },
    submitButtonLabel: t('common:save'),
    secondaryButton: () => (
      <Button onClick={onCancel}>{t('common:cancel')}</Button>
    ),
    onSubmit,
    t,
    error,
  });

  return Form;
}
