import { useTranslation } from 'react-i18next';
import { Button, Card, CardContent } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import { useClassForm } from 'shared/hooks';
import useCreateClassQuery from './hooks/use-create-class-query';
import { ClassForm } from 'shared/types/class';

export default function CreateClass() {
  const { t } = useTranslation('settings');
  const createClass = useCreateClassQuery();

  const handleCreateAndShow = (values: ClassForm) => {
    createClass({ values, show: true });
  };

  const handleCreate = (values: ClassForm) => {
    createClass({ values });
  };

  const { Form } = useClassForm({
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
        {t('common:createAndView')}
      </Button>
    ),
    onSubmit: handleCreate,
    t,
  });

  return (
    <CommonViewLayout headerTitle={t('classes.create.title')} maxWidth={600}>
      <Card>
        <CardContent>{Form}</CardContent>
      </Card>
    </CommonViewLayout>
  );
}
