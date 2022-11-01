import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers';
import { addHours, addMinutes, addYears, subMinutes } from 'date-fns';
import { ArrowRightAlt, HelpOutline } from '@mui/icons-material';

import { TaskForm, TaskType } from 'shared/types/task';
import {
  contentRequiredError,
  publishTimeRequiredError,
  titleRequiredError,
} from 'shared/consts/error';
import useCustomNavigate from 'hooks/use-custom-navigate';
import {
  DEFAULT_TASK_DURATION_IN_HOURS,
  MAX_TASK_DURATION_IN_MINUTES,
  MIN_TASK_DURATION_IN_MINUTES,
} from 'shared/consts/task';
import { getReadableTimeDifference } from 'shared/utils/date.utils';
import { MINUTE } from 'shared/consts/date';
import DurationDropdown from 'shared/components/DurationDropdown';

interface UseTaskFormProps {
  type: TaskType;
  initialValues: TaskForm;
  submitButtonLabel: string;
  onSubmit: (form: TaskForm) => void;
  t: TFunction;
}

export function useTaskForm(props: UseTaskFormProps) {
  const { initialValues, submitButtonLabel, onSubmit, t } = props;
  const [isUntouched, setIsUntouched] = useState(true);
  const [startTimeDatePickerOpened, setStartTimeDatePickerOpened] =
    useState(false);
  const [endTimeDatePickerOpened, setEndTimeDatePickerOpened] = useState(false);
  const [startTimeDatePickerValue, setStartTimeDatePickerValue] =
    useState<Date | null>(null);
  const [endTimeDatePickerValue, setEndTimeDatePickerValue] =
    useState<Date | null>(null);
  const { back } = useCustomNavigate();

  const formik = useFormik<TaskForm>({
    initialValues,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      subjectId: yup.string(),
      name: yup.string().required(titleRequiredError),
      content: yup.string().required(contentRequiredError),
      startTime: yup.date().required(publishTimeRequiredError),
      endTime: yup.date().required(publishTimeRequiredError),
    }),
    onSubmit,
  });

  const {
    errors,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldError,
    setFieldValue,
    touched,
    values,
  } = formik;

  const currentTaskType = useMemo(() => {
    if (values.startTime && values.endTime) {
      const delta = values.endTime.getTime() - values.startTime.getTime();

      if (delta >= MAX_TASK_DURATION_IN_MINUTES) {
        return TaskType.Homework;
      }
      return TaskType.Task;
    }
    return null;
  }, [values.startTime, values.endTime]);

  const endTimeError = useMemo(() => {
    if (values.startTime && values.endTime) {
      const deltaInMinutes =
        (values.endTime.getTime() - values.startTime.getTime()) / MINUTE;
      if (deltaInMinutes < MIN_TASK_DURATION_IN_MINUTES) {
        const error = 'error:TASK_DURATION_TOO_SHORT';
        setFieldError(
          'endTime',
          t(error, { min: MIN_TASK_DURATION_IN_MINUTES })
        );
        return error;
      }
    }
    return '';
  }, [values.startTime, values.endTime, setFieldError, t]);

  useEffect(() => {
    setIsUntouched(
      values.name === initialValues.name &&
        values.content === initialValues.content &&
        values.startTime?.getTime() === initialValues.startTime?.getTime() &&
        values.endTime?.getTime() === initialValues.endTime?.getTime()
    );
  }, [initialValues, values]);

  const validateAndFixEndTime = useCallback(
    (startTime: Date | null) => {
      if (startTime) {
        if (!values.endTime) {
          setFieldValue(
            'endTime',
            addHours(startTime, DEFAULT_TASK_DURATION_IN_HOURS)
          );
          setFieldError('endTime', undefined);
        } else if (values.startTime) {
          if (
            startTime.getTime() >=
            subMinutes(values.endTime, MIN_TASK_DURATION_IN_MINUTES).getTime()
          ) {
            const newEndTime = addMinutes(
              startTime,
              MIN_TASK_DURATION_IN_MINUTES
            );
            setFieldValue('endTime', newEndTime);
            setFieldError('endTime', undefined);
          }
        }
      }
    },
    [setFieldError, setFieldValue, values.endTime, values.startTime]
  );

  const updateTimeFormValue = useCallback(
    (type: 'startTime' | 'endTime', newValue?: Date | null) => {
      const datePickerValue =
        type === 'startTime'
          ? startTimeDatePickerValue
          : endTimeDatePickerValue;
      const value = newValue !== undefined ? newValue : datePickerValue;

      setStartTimeDatePickerOpened(false);
      setEndTimeDatePickerOpened(false);

      if (value !== null) {
        if (type === 'startTime') {
          validateAndFixEndTime(value);
        }
        setFieldValue(type, value);
        console.log('setfieldvalue', value);
      }
    },
    [
      endTimeDatePickerValue,
      setFieldValue,
      startTimeDatePickerValue,
      validateAndFixEndTime,
    ]
  );

  const handleTimeChange = useCallback(
    (type: 'startTime' | 'endTime', dateTime: Date | null) => {
      if (type === 'startTime' && startTimeDatePickerOpened) {
        setStartTimeDatePickerValue(dateTime);
      } else if (type === 'endTime' && endTimeDatePickerOpened) {
        setEndTimeDatePickerValue(dateTime);
      } else {
        updateTimeFormValue(type, dateTime);
      }
    },
    [endTimeDatePickerOpened, startTimeDatePickerOpened, updateTimeFormValue]
  );

  useEffect(() => {
    if (!startTimeDatePickerOpened) {
      updateTimeFormValue('startTime');
    } else if (!endTimeDatePickerOpened) {
      updateTimeFormValue('endTime');
    }
  }, [startTimeDatePickerOpened, endTimeDatePickerOpened, updateTimeFormValue]);

  const submitButtonTooltip = useMemo(() => {
    if (!isValid || isUntouched) {
      const key = !isValid ? 'missingData' : 'formUntouched';
      return t('common:tooltip.' + key);
    }
    return '';
  }, [t, isValid, isUntouched]);

  const handleStartTimeNow = () => {
    const nowTimestamp = new Date().getTime();
    const roundedNowTimestamp = Math.floor(nowTimestamp / MINUTE) * MINUTE;
    setFieldValue('startTime', new Date(roundedNowTimestamp));
  };

  const handleDurationSelect = (valueInMinutes: number) => {
    if (values.startTime) {
      const endTime = addMinutes(values.startTime, valueInMinutes);
      setFieldValue('endTime', endTime);
    }
  };

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
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {t('shortcuts')}:{' '}
        <Button onClick={handleStartTimeNow}>{t('setStartNow')}</Button>
        <DurationDropdown
          disabled={!values.startTime}
          onSelect={handleDurationSelect}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <DateTimePicker
          label={t('create.placeholder.startTime')}
          value={values.startTime}
          disablePast
          renderInput={(params) => (
            <TextField name="startTime" sx={{ flex: 1 }} {...params} />
          )}
          onChange={(value) => handleTimeChange('startTime', value)}
          onOpen={() => setStartTimeDatePickerOpened(true)}
          onClose={() => setStartTimeDatePickerOpened(false)}
        />

        <ArrowRightAlt />

        <DateTimePicker
          label={t('create.placeholder.endTime')}
          value={values.endTime}
          disablePast
          minDateTime={
            values.startTime
              ? addMinutes(values.startTime, MIN_TASK_DURATION_IN_MINUTES)
              : null
          }
          maxDateTime={values.startTime ? addYears(values.startTime, 1) : null}
          renderInput={(params) => (
            <TextField name="endTime" sx={{ flex: 1 }} {...params} />
          )}
          onChange={(value) => handleTimeChange('endTime', value)}
          onOpen={() => setEndTimeDatePickerOpened(true)}
          onClose={() => setEndTimeDatePickerOpened(false)}
        />
      </Box>

      {values.startTime && values.endTime && (
        <Box>
          <Typography>
            {t('common:duration')}:{' '}
            <Typography
              component="span"
              color={endTimeError ? 'error' : 'text'}
              fontWeight="bold"
            >
              <Tooltip
                title={
                  endTimeError
                    ? t(endTimeError, { min: MIN_TASK_DURATION_IN_MINUTES }) +
                      ''
                    : ''
                }
              >
                <span>
                  {getReadableTimeDifference(
                    values.endTime,
                    values.startTime,
                    t
                  )}
                  {endTimeError && <HelpOutline sx={{ fontSize: 14 }} />}
                </span>
              </Tooltip>
            </Typography>
          </Typography>

          {currentTaskType && (
            <Typography>
              {t('currentType')}: <strong>{t(currentTaskType)}</strong>
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 3, '*': { flex: 1 } }}>
        <Tooltip title={submitButtonTooltip}>
          <Box sx={{ display: 'flex', '*': { flex: 1 } }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!(isValid || endTimeError) || isUntouched}
            >
              {submitButtonLabel}
            </Button>
          </Box>
        </Tooltip>

        <Button color="secondary" onClick={() => back()}>
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
