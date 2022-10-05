import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import { useSubjectForm } from 'shared/hooks';
import useCreateSubjectQuery from './hooks/use-create-subject-query';
import { SubjectForm } from 'shared/types/subject';

export default function CreateSubject() {
  const { t } = useTranslation('settings');
  const createSubject = useCreateSubjectQuery();

  const handleCreateAndShow = (values: SubjectForm) => {
    createSubject({ values, show: true });
  };

  const handleCreate = (values: SubjectForm) => {
    createSubject({ values });
  };

  const { Form } = useSubjectForm({
    initialValues: {
      category: null,
      subjectClass: null,
      teacher: null,
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
        {t('common:createAndView')}
      </Button>
    ),
    onSubmit: handleCreate,
    t,
  });

  return (
    <CommonViewLayout headerTitle={t('subjects.create.title')} maxWidth={600}>
      {Form}
    </CommonViewLayout>
  );
}
