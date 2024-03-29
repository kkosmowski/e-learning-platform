import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import { TFunction } from 'i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';

import { NoticeForm } from 'shared/types/notice';
import {
  contentRequiredError,
  publishTimeRequiredError,
  titleRequiredError,
} from 'shared/consts/error';
import LabelledCheckbox from 'shared/components/LabelledCheckbox';

interface UseNoticeFormProps {
  initialValues: NoticeForm;
  submitButtonLabel: string;
  onSubmit: (form: NoticeForm) => void;
  t: TFunction;
}

export function useNoticeForm(props: UseNoticeFormProps) {
  const { initialValues, submitButtonLabel, onSubmit, t } = props;
  const [isUntouched, setIsUntouched] = useState(true);
  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(null);
  const navigate = useNavigate();

  const formik = useFormik<NoticeForm>({
    initialValues,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      subjectId: yup.string(),
      name: yup.string().required(titleRequiredError),
      content: yup.string().required(contentRequiredError),
      publishInstantly: yup.boolean(),
      publishTime: yup
        .date()
        .nullable()
        .when('publishInstantly', {
          is: false,
          then: yup.date().required(publishTimeRequiredError),
        }),
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
    touched,
    values,
  } = formik;

  useEffect(() => {
    setIsUntouched(
      values.name === initialValues.name &&
        values.content === initialValues.content &&
        values.publishInstantly === initialValues.publishInstantly &&
        values.publishTime?.getTime() === initialValues.publishTime?.getTime()
    );
  }, [initialValues, values]);

  const handlePublishInstantlyChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue('publishInstantly', event.target.checked);
  };

  const handlePublishTimeChange = (dateTime: Date | null) => {
    if (datePickerOpened) {
      setDatePickerValue(dateTime);
    } else {
      updatePublishTimeFormValue(dateTime);
    }
  };

  const updatePublishTimeFormValue = (newValue?: Date | null) => {
    const value = newValue !== undefined ? newValue : datePickerValue;
    setDatePickerOpened(false);
    setFieldValue('publishTime', value);
  };

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
        flex: 1,
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
        sx={{ flex: 1 }}
        InputProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            textarea: {
              flex: 1,
            },
          },
        }}
        name="content"
        placeholder={t('create.placeholder.content')}
        value={values.content}
        error={touched.content && Boolean(errors.content)}
        helperText={touched.content && errors.content && t(errors.content)}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Tooltip
        title={values.isPublished ? t('tooltip.alreadyPublished') + '' : ''}
      >
        <LabelledCheckbox
          label={t('create.publishInstantly')}
          name="publishInstantly"
          checked={values.publishInstantly}
          onBlur={handleBlur}
          disabled={values.isPublished}
          onChange={handlePublishInstantlyChange}
        />
      </Tooltip>

      {!values.publishInstantly && (
        <DateTimePicker
          label={t('create.placeholder.publishTime')}
          value={values.publishTime}
          disablePast={!values.isPublished}
          disabled={values.isPublished}
          renderInput={(params) => <TextField {...params} name="publishTime" />}
          onChange={handlePublishTimeChange}
          onOpen={() => setDatePickerOpened(true)}
          onClose={updatePublishTimeFormValue}
        />
      )}

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

        <Button color="secondary" onClick={() => navigate(-1)}>
          {t('common:cancel')}
        </Button>
      </Box>
    </form>
  );

  return {
    formik,
    Form,
  };
}
