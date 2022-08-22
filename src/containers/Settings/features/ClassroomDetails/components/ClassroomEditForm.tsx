import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import { Classroom, ClassroomForm } from 'shared/types/classroom';
import useClassroomForm from 'shared/hooks/use-classroom-form';

interface ClassroomEditFormProps {
  classroom: Classroom;
  onSubmit: (form: ClassroomForm) => void;
  onCancel: () => void;
}

export default function ClassroomEditForm(props: ClassroomEditFormProps) {
  const { classroom, onSubmit, onCancel } = props;
  const { t } = useTranslation('settings');
  const { Form } = useClassroomForm({
    initialValues: {
      name: classroom.name,
      teacher: classroom.teacher,
      students: classroom.students,
    },
    submitButtonLabel: t('common:save'),
    secondaryButton: () => (
      <Button onClick={onCancel}>{t('common:cancel')}</Button>
    ),
    onSubmit,
    t,
  });

  return Form;
}
