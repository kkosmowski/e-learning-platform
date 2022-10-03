import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import { Subject, SubjectForm } from 'shared/types/subject';
import { useSubjectForm } from 'shared/hooks';

interface SubjectEditFormProps {
  subject: Subject;
  error: string;
  onSubmit: (form: SubjectForm) => void;
  onCancel: () => void;
}

export default function SubjectEditForm(props: SubjectEditFormProps) {
  const { subject, error, onSubmit, onCancel } = props;
  const { t } = useTranslation('settings');
  const { Form } = useSubjectForm({
    initialValues: {
      category: subject.category,
      classroom: subject.classroom,
      teacher: subject.teacher,
    },
    submitButtonLabel: t('common:save'),
    secondaryButton: () => (
      <Button onClick={onCancel}>{t('common:cancel')}</Button>
    ),
    onSubmit,
    t,
    error,
    disabled: ['category', 'classroom'],
  });

  return Form;
}
