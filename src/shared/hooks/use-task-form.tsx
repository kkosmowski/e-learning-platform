import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
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
  const {
    type: initialType,
    initialValues,
    submitButtonLabel,
    onSubmit,
    t,
  } = props;
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
      type: yup.mixed<TaskType>().oneOf(Object.values(TaskType)),
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
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = formik;

  const currentTaskType = useMemo(() => {
    if (values.startTime && values.endTime) {
      const delta = values.endTime.getTime() - values.startTime.getTime();

      if (delta >= MAX_TASK_DURATION_IN_MINUTES) {
        setFieldValue('type', TaskType.Homework);
        return TaskType.Homework;
      }
      setFieldValue('type', TaskType.Task);
      return TaskType.Task;
    }
    return null;
  }, [values.startTime, values.endTime, setFieldValue]);

  const typeWarningVisible = useMemo(
    () => initialType !== currentTaskType,
    [currentTaskType, initialType]
  );

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
    return null;
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
    async (startTime: Date | null) => {
      if (startTime) {
        if (!values.endTime) {
          await setFieldValue(
            'endTime',
            new Date(addHours(startTime, DEFAULT_TASK_DURATION_IN_HOURS))
          );
          await setFieldTouched('endTime', true);
          setFieldError('endTime', undefined);
        } else if (values.startTime) {
          if (
            startTime.getTime() >=
            subMinutes(values.endTime, MIN_TASK_DURATION_IN_MINUTES).getTime()
          ) {
            const newEndTime = new Date(
              addMinutes(startTime, MIN_TASK_DURATION_IN_MINUTES)
            );
            await setFieldValue('endTime', newEndTime);
            await setFieldTouched('endTime', true);
            setFieldError('endTime', undefined);
          }
        }
      }
    },
    [
      setFieldError,
      setFieldTouched,
      setFieldValue,
      values.endTime,
      values.startTime,
    ]
  );

  const updateTimeFormValue = useCallback(
    async (type: 'startTime' | 'endTime', newValue?: Date | null) => {
      const datePickerValue =
        type === 'startTime'
          ? startTimeDatePickerValue
          : endTimeDatePickerValue;
      const value = newValue !== undefined ? newValue : datePickerValue;

      setStartTimeDatePickerOpened(false);
      setEndTimeDatePickerOpened(false);

      if (type === 'startTime') {
        await validateAndFixEndTime(value);
      }
      await setFieldValue(type, value);
      await setFieldTouched(type, true);
    },
    [
      endTimeDatePickerValue,
      setFieldValue,
      setFieldTouched,
      startTimeDatePickerValue,
      validateAndFixEndTime,
    ]
  );

  const handleTimeChange = useCallback(
    async (type: 'startTime' | 'endTime', dateTime: Date | null) => {
      if (type === 'startTime' && startTimeDatePickerOpened) {
        setStartTimeDatePickerValue(dateTime);
      } else if (type === 'endTime' && endTimeDatePickerOpened) {
        setEndTimeDatePickerValue(dateTime);
      } else {
        await updateTimeFormValue(type, dateTime);
      }
    },
    [endTimeDatePickerOpened, startTimeDatePickerOpened, updateTimeFormValue]
  );

  useEffect(() => {
    if (!startTimeDatePickerOpened && startTimeDatePickerValue) {
      void updateTimeFormValue('startTime', startTimeDatePickerValue);
    } else if (!endTimeDatePickerOpened && endTimeDatePickerValue) {
      void updateTimeFormValue('endTime', endTimeDatePickerValue);
    }
  }, [
    startTimeDatePickerValue,
    endTimeDatePickerValue,
    startTimeDatePickerOpened,
    endTimeDatePickerOpened,
    updateTimeFormValue,
  ]);

  const submitButtonTooltip = useMemo(() => {
    if (!isValid || isUntouched) {
      const key = !isValid ? 'missingData' : 'formUntouched';
      return t('common:tooltip.' + key);
    }
    return '';
  }, [t, isValid, isUntouched]);

  const handleStartTimeNow = async () => {
    const nowTimestamp = new Date().getTime();
    const roundedNowTimestamp = Math.floor(nowTimestamp / MINUTE) * MINUTE;
    await setFieldValue('startTime', new Date(roundedNowTimestamp));
    await setFieldTouched('startTime', true);
  };

  const handleDurationSelect = async (valueInMinutes: number) => {
    if (values.startTime) {
      const endTime = new Date(addMinutes(values.startTime, valueInMinutes));
      await setFieldValue('endTime', endTime);
      await setFieldTouched('endTime', true);
      setFieldError('endTime', undefined);
    }
  };

  const handleMandatoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('mandatory', event.target.checked);
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
        placeholder={t('form.placeholder.name')}
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
        placeholder={t('form.placeholder.content')}
        value={values.content}
        error={touched.content && Boolean(errors.content)}
        helperText={touched.content && errors.content && t(errors.content)}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {t('form.shortcuts')}:{' '}
        <Button onClick={handleStartTimeNow}>{t('form.setStartNow')}</Button>
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
          label={t('form.placeholder.startTime')}
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
          label={t('form.placeholder.endTime')}
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

      <FormControlLabel
        sx={{ alignSelf: 'flex-start' }}
        control={
          <Checkbox
            name="mandatory"
            checked={values.mandatory}
            onBlur={handleBlur}
            onChange={handleMandatoryChange}
          />
        }
        label={t('form.mandatoryLabel')}
      />

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
              {t('form.currentType')}: <strong>{t(currentTaskType)}</strong>
            </Typography>
          )}

          <Typography>
            {t('form.currentMandatory')}:{' '}
            <strong>{t(`form.mandatory.${String(values.mandatory)}`)}</strong>
          </Typography>

          {typeWarningVisible && (
            <Typography color="text.warning">
              {t('form.typeChangedTo.' + currentTaskType)}
            </Typography>
          )}
        </Box>
      )}

      {/*
       @todo show warning when current type was *automatically* changed from original
        (this can happen when someone started creating Task and set duration to e.g. 2 days)
      */}

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
