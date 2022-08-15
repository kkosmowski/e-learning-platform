import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Autocomplete, Box, Button, TextField } from '@mui/material';

import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';
import { CreateClassroomForm } from 'shared/consts/classroom';
import {
  classroomNameRequiredError,
  classroomTeacherRequiredError,
} from 'shared/consts/error';
import { getErrorDetail } from 'shared/utils/common.utils';

export default function CreateClassroom() {
  const { t } = useTranslation('settings');

  const handleCreate = async () => {
    try {
      // @todo call backend
      toast.success(t('classrooms.create.createSuccessToast', { name }));
    } catch (err: unknown) {
      const error = getErrorDetail(err);
      toast.error(t(error));
    }
  };

  const formik = useFormik<CreateClassroomForm>({
    initialValues: {
      name: '',
      teacherId: null,
      studentIds: [],
    },
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      name: yup.string().required(classroomNameRequiredError),
      teacherId: yup
        .string()
        .nullable()
        .required(classroomTeacherRequiredError),
      studentIds: yup.array(),
    }),
    onSubmit: handleCreate,
  });

  const {
    errors,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
  } = formik;

  const handleCreateAndShow = async () => {
    await handleCreate();
    // @todo navigate to the classroom
  };

  return (
    <>
      <ViewHeader title={t('classrooms.create.title')} />

      <Centered>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 600,
          }}
        >
          <TextField
            name="name"
            placeholder={t('classrooms.create.placeholder.name')}
            value={values.name}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name && t(errors.name)}
            autoFocus
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                name="teacherId"
                placeholder={t('classrooms.create.placeholder.teacherId')}
                value={values.teacherId}
                error={touched.teacherId && Boolean(errors.teacherId)}
                helperText={
                  touched.teacherId && errors.teacherId && t(errors.teacherId)
                }
                onBlur={handleBlur}
                onChange={handleChange}
              />
            )}
            options={[]}
          />

          <Autocomplete
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                name="studentIds"
                placeholder={t('classrooms.create.placeholder.studentIds')}
                value={values.studentIds}
                error={touched.studentIds && Boolean(errors.studentIds)}
                helperText={
                  touched.studentIds &&
                  errors.studentIds &&
                  t(errors.studentIds)
                }
                onBlur={handleBlur}
                onChange={handleChange}
              />
            )}
            options={[]}
          />

          <Box sx={{ display: 'flex', gap: 3, '*': { flex: 1 } }}>
            <Button type="submit" variant="contained" disabled={!isValid}>
              {t('common:create')}
            </Button>

            <Button
              type="button"
              variant="contained"
              disabled={!isValid}
              color="secondary"
              onClick={handleCreateAndShow}
            >
              {t('classrooms.create.createAndShow')}
            </Button>
          </Box>
        </form>
      </Centered>
    </>
  );
}
