import { useEffect, useMemo, useState } from 'react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import { TFunction } from 'i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { NoticeForm } from 'shared/types/notice';
import { contentRequiredError, titleRequiredError } from 'shared/consts/error';

interface UseNoticeFormProps {
  initialValues: NoticeForm;
  submitButtonLabel: string;
  onSubmit: (form: NoticeForm) => void;
  t: TFunction;
}

export function useNoticeForm(props: UseNoticeFormProps) {
  const { initialValues, submitButtonLabel, onSubmit, t } = props;
  const [isUntouched, setIsUntouched] = useState(true);

  const formik = useFormik<NoticeForm>({
    initialValues,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      subjectId: yup.string(),
      name: yup.string().required(titleRequiredError),
      content: yup.string().required(contentRequiredError),
    }),
    onSubmit,
  });

  const {
    errors,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    touched,
    values,
  } = formik;

  useEffect(() => {
    setIsUntouched(
      values.name === initialValues.name &&
        values.content === initialValues.content
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
      <TextField
        name="name"
        placeholder={t('create.placeholder.name')}
        value={values.name}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name && t(errors.name)}
        autoFocus
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <TextField
        multiline
        rows={10}
        name="content"
        placeholder={t('create.placeholder.content')}
        value={values.content}
        error={touched.content && Boolean(errors.content)}
        helperText={touched.content && errors.content && t(errors.content)}
        autoFocus
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {/* @todo add Checkbox "Publish instantly"
      if not checked, empty Date Field should be enabled and form invalid 
      until either checkbox is checked or Date (with hours and minutes) is provided */}

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

        <Button color="secondary">Cancel</Button>
      </Box>
    </form>
  );

  return {
    formik,
    Form,
  };
}
