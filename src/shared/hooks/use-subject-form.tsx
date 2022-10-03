import { ReactNode, SyntheticEvent, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';

import { Role, User } from 'shared/types/user';
import { SubjectCategory, SubjectForm } from 'shared/types/subject';
import ListGridItem from 'shared/components/ListGridItem';
import { SubjectClassroom } from 'shared/types/classroom';
import { useUsersQuery } from './use-users-query';
import { useClassroomsQuery } from './use-classrooms-query';
import { useSubjectCategoriesQuery } from './use-subject-categories-query';

export interface UseSubjectFormProps {
  initialValues: SubjectForm;
  submitButtonLabel: string;
  secondaryButton?: (
    formik: ReturnType<typeof useFormik<SubjectForm>>
  ) => ReactNode;
  onSubmit: (form: SubjectForm) => void;
  t: TFunction;
  error?: string;
  disabled?: (keyof SubjectForm)[];
}

export function useSubjectForm(props: UseSubjectFormProps) {
  const {
    initialValues,
    submitButtonLabel,
    secondaryButton,
    t,
    error,
    onSubmit,
    disabled,
  } = props;
  const { subjectCategories } = useSubjectCategoriesQuery();
  const { classrooms } = useClassroomsQuery();
  const { users: teachers, fetchUsers } = useUsersQuery();

  useEffect(() => {
    fetchUsers({ role: Role.Teacher });
  }, []);

  const formik = useFormik<SubjectForm>({
    initialValues,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      category: yup.object().required(),
      classroom: yup.object().required(),
      teacher: yup.object().required(),
    }),
    onSubmit,
  });

  const {
    errors,
    isValid,
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
    values,
  } = formik;

  const handleCategoryChange = (
    event: SyntheticEvent,
    value: SubjectCategory | null
  ) => {
    setFieldValue('category', value);
  };

  const handleClassroomChange = (
    event: SyntheticEvent,
    value: SubjectClassroom | null
  ) => {
    setFieldValue('classroom', value);
  };

  const handleTeacherChange = (event: SyntheticEvent, value: User | null) => {
    setFieldValue('teacher', value);
  };

  useEffect(() => {
    console.log(isValid, errors);
  }, [values, isValid, errors]);

  const Form = (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {disabled?.includes('category') ? (
        <ListGridItem
          element="div"
          label={t('subjects.details.category')}
          value={values.category?.name}
        />
      ) : (
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              name="category"
              placeholder={t('subjects.placeholders.category')}
              error={touched.category && Boolean(errors.category)}
              helperText={
                touched.category &&
                errors.category &&
                t('error:SUBJECT_CATEGORY_REQUIRED')
              }
            />
          )}
          value={values.category}
          options={subjectCategories || []}
          getOptionLabel={(category) => category.name}
          onBlur={handleBlur}
          onChange={handleCategoryChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      )}

      {disabled?.includes('classroom') ? (
        <ListGridItem
          element="div"
          label={t('subjects.details.classroom')}
          value={values.classroom?.name}
        />
      ) : (
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              name="classroom"
              placeholder={t('subjects.placeholders.classroom')}
              error={touched.classroom && Boolean(errors.classroom)}
              helperText={
                touched.classroom &&
                errors.classroom &&
                t('error:SUBJECT_CLASS_REQUIRED')
              }
            />
          )}
          value={values.classroom}
          options={classrooms || []}
          getOptionLabel={(classroom) => classroom.name}
          onBlur={handleBlur}
          onChange={handleClassroomChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      )}

      {disabled?.includes('teacher') ? (
        <ListGridItem
          element="div"
          label={t('subjects.details.teacher')}
          value={values.teacher?.fullName}
        />
      ) : (
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              name="teacher"
              placeholder={t('subjects.placeholders.teacher')}
              error={touched.teacher && Boolean(errors.teacher)}
              helperText={
                touched.teacher &&
                errors.teacher &&
                t('error:SUBJECT_TEACHER_REQUIRED')
              }
            />
          )}
          value={values.teacher}
          options={teachers || []}
          getOptionLabel={(teacher) => teacher.fullName}
          onBlur={handleBlur}
          onChange={handleTeacherChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      )}

      {error && <Typography color="error">{t(error)}</Typography>}

      <Box sx={{ display: 'flex', gap: 3, '*': { flex: 1 } }}>
        <Button type="submit" variant="contained" disabled={!isValid}>
          {submitButtonLabel}
        </Button>

        {secondaryButton && secondaryButton(formik)}
      </Box>
    </form>
  );

  return {
    formik,
    Form,
  };
}
