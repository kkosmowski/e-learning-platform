import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import { createClassroom } from 'api/classroom';
import { ClassroomForm } from 'shared/types/classroom';
import { getErrorDetail } from 'shared/utils/common.utils';
import useClassroomForm from 'shared/hooks/use-classroom-form';

export default function CreateClassroom() {
  const { t } = useTranslation('settings');

  const handleCreate = async (formValues: ClassroomForm) => {
    try {
      await createClassroom(formValues);
      toast.success(
        t('classrooms.create.createSuccessToast', { name: formValues.name })
      );
    } catch (err: unknown) {
      const error = getErrorDetail(err);
      toast.error(t(error));
    }
  };

  const handleCreateAndShow = async () => {
    await handleCreate(values);
    // @todo navigate to the classroom
  };

  const {
    formik: { values },
    Form,
  } = useClassroomForm({
    initialValues: {
      name: '',
      teacher: null,
      students: [],
    },
    submitButtonLabel: t('common:create'),
    secondaryButton: ({ isValid }) => (
      <Button
        type="button"
        variant="contained"
        disabled={!isValid}
        color="secondary"
        onClick={handleCreateAndShow}
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
