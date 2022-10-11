import { ReactNode, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';

import { Role, User } from 'shared/types/user';
import { SubjectCategory, SubjectForm } from 'shared/types/subject';
import ListGridItem from 'shared/components/ListGridItem';
import { SubjectClass } from 'shared/types/class';
import { useUsersQuery } from './use-users-query';
import { useClassesQuery } from './use-classes-query';
import { useSubjectCategoriesQuery } from './use-subject-categories-query';
import { areArraysEqual } from '@mui/base';

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
  const { classes } = useClassesQuery();
  const { users: teachers, fetchUsers } = useUsersQuery();
  const [isUntouched, setIsUntouched] = useState(true);

  useEffect(() => {
    fetchUsers({ role: Role.Teacher });
  }, []);

  const formik = useFormik<SubjectForm>({
    initialValues,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      category: yup.object().required(),
      subjectClass: yup.object().required(),
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

  const handleClassChange = (
    event: SyntheticEvent,
    value: SubjectClass | null
  ) => {
    setFieldValue('subjectClass', value);
  };

  const handleTeacherChange = (event: SyntheticEvent, value: User | null) => {
    setFieldValue('teacher', value);
  };

  useEffect(() => {
    setIsUntouched(
      values.category?.id === initialValues.category?.id &&
        values.subjectClass?.id === initialValues.subjectClass?.id &&
        values.teacher?.id === initialValues.teacher?.id
    );
  }, [initialValues, values]);

  const submitButtonTooltip = useMemo(() => {
    if (!isValid || isUntouched) {
      const key = !isValid ? 'missingData' : 'formUntouched';
      return t('common:tooltip.' + key);
    }
    return '';
  }, [t, isValid, isUntouched]);

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
              placeholder={t('subjects.placeholder.category')}
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

      {disabled?.includes('subjectClass') ? (
        <ListGridItem
          element="div"
          label={t('subjects.details.class')}
          value={values.subjectClass?.name}
        />
      ) : (
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              name="subjectClass"
              placeholder={t('subjects.placeholder.class')}
              error={touched.subjectClass && Boolean(errors.subjectClass)}
              helperText={
                touched.subjectClass &&
                errors.subjectClass &&
                t('error:SUBJECT_CLASS_REQUIRED')
              }
            />
          )}
          value={values.subjectClass}
          options={classes || []}
          getOptionLabel={(subjectClass) => subjectClass.name}
          onBlur={handleBlur}
          onChange={handleClassChange}
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
              placeholder={t('subjects.placeholder.teacher')}
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
        <Tooltip title={submitButtonTooltip}>
          <Box sx={{ display: 'flex', '*': { flex: 1 } }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isUntouched}
            >
              {submitButtonLabel}
            </Button>
          </Box>
        </Tooltip>

        {secondaryButton && secondaryButton(formik)}
      </Box>
    </form>
  );

  return {
    formik,
    Form,
  };
}
