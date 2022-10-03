import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import { useClassroomForm } from 'shared/hooks';
import useCreateClassroomQuery from './hooks/use-create-classroom-query';
import { ClassroomForm } from 'shared/types/classroom';

export default function CreateClassroom() {
  const { t } = useTranslation('settings');
  const createClassroom = useCreateClassroomQuery();

  const handleCreateAndShow = (values: ClassroomForm) => {
    createClassroom({ values, show: true });
  };

  const handleCreate = (values: ClassroomForm) => {
    createClassroom({ values });
  };

  const { Form } = useClassroomForm({
    initialValues: {
      name: '',
      teacher: null,
      students: [],
    },
    submitButtonLabel: t('common:create'),
    secondaryButton: ({ isValid, values }) => (
      <Button
        type="button"
        variant="contained"
        disabled={!isValid}
        color="secondary"
        onClick={() => handleCreateAndShow(values)}
      >
        {t('classrooms.create.createAndShow')}
      </Button>
    ),
    onSubmit: handleCreate,
    t,
  });

  return (
    <CommonViewLayout headerTitle={t('classrooms.create.title')} maxWidth={600}>
      {Form}
    </CommonViewLayout>
  );
}
