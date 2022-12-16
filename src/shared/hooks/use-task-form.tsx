import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import {
  addHours,
  addMinutes,
  addYears,
  millisecondsToMinutes,
  subMinutes,
} from 'date-fns';
import { ArrowRightAlt, HelpOutline } from '@mui/icons-material';

import { TaskForm, TaskType } from 'shared/types/task';
import {
  contentRequiredError,
  publishTimeRequiredError,
  titleRequiredError,
} from 'shared/consts/error';
import {
  DEFAULT_TASK_DURATION_IN_HOURS,
  MAX_TASK_DURATION_IN_HOURS,
  MAX_TASK_DURATION_IN_MINUTES,
  MIN_TASK_DURATION_IN_MINUTES,
} from 'shared/consts/task';
import {
  getReadableTimeDifference,
  isDateAfterAnother,
  isPastDate,
} from 'shared/utils/date.utils';
import { MINUTE } from 'shared/consts/date';
import DurationDropdown from 'shared/components/DurationDropdown';
import LabelledCheckbox from '../components/LabelledCheckbox';

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
  const [startPickerOpened, setStartPickerOpened] = useState(false);
  const [endPickerOpened, setEndPickerOpened] = useState(false);
  const [startPickerValue, setStartPickerValue] = useState<Date | null>(null);
  const [endPickerValue, setEndPickerValue] = useState<Date | null>(null);
  const navigate = useNavigate();
  const isEditMode = Boolean(initialValues.name);

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

  const startTimeDisabled = useMemo(
    () => !!initialValues.startTime && isPastDate(initialValues.startTime),
    [initialValues.startTime]
  );

  const maxEndTime = useMemo(() => {
    if (!values.startTime) return null;
    if (values.type === TaskType.Homework || !isEditMode)
      return addYears(values.startTime, 1);
    return addMinutes(values.startTime, MAX_TASK_DURATION_IN_MINUTES);
  }, [isEditMode, values.type, values.startTime]);

  useEffect(() => {
    if (isEditMode) return;
    if (values.startTime && values.endTime) {
      const deltaInMinutes = millisecondsToMinutes(
        values.endTime.getTime() - values.startTime.getTime()
      );

      if (deltaInMinutes >= MAX_TASK_DURATION_IN_MINUTES) {
        setFieldValue('type', TaskType.Homework);
      } else {
        setFieldValue('type', TaskType.Task);
      }
    }
  }, [
    isEditMode,
    initialType,
    values.startTime,
    values.endTime,
    setFieldValue,
  ]);

  const typeWarningVisible = useMemo(
    () => initialType !== values.type,
    [values.type, initialType]
  );

  const checkIfInvalidEndTime = useCallback(
    (dateTime: Date | null) => {
      if (values.startTime && values.endTime) {
        if (
          dateTime &&
          maxEndTime &&
          isDateAfterAnother(dateTime, maxEndTime)
        ) {
          if (values.type === TaskType.Task) {
            setFieldError(
              'endTime',
              t('error:TASK_DURATION_TOO_LONG', {
                max: MAX_TASK_DURATION_IN_HOURS,
              })
            );
          } else if (values.type === TaskType.Homework) {
            setFieldError('endTime', t('error:HOMEWORK_DURATION_TOO_LONG'));
          }
          return;
        }

        const deltaInMinutes =
          (values.endTime.getTime() - values.startTime.getTime()) / MINUTE;
        if (deltaInMinutes < MIN_TASK_DURATION_IN_MINUTES) {
          setFieldError(
            'endTime',
            t('error:TASK_DURATION_TOO_SHORT', {
              min: MIN_TASK_DURATION_IN_MINUTES,
            })
          );
        }
      }
    },
    [
      maxEndTime,
      setFieldError,
      t,
      values.endTime,
      values.startTime,
      values.type,
    ]
  );

  useEffect(() => {
    setIsUntouched(
      values.name === initialValues.name &&
        values.content === initialValues.content &&
        values.startTime?.getTime() === initialValues.startTime?.getTime() &&
        values.endTime?.getTime() === initialValues.endTime?.getTime()
    );
    setTimeout(() => checkIfInvalidEndTime(values.endTime));
  }, [initialValues, values, checkIfInvalidEndTime]);

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
        type === 'startTime' ? startPickerValue : endPickerValue;
      const value = newValue !== undefined ? newValue : datePickerValue;

      setStartPickerOpened(false);
      setEndPickerOpened(false);

      if (type === 'startTime') await validateAndFixEndTime(value);
      await setFieldValue(type, value);
      if (type === 'endTime') checkIfInvalidEndTime(value);
      await setFieldTouched(type, true);
    },
    [
      startPickerValue,
      endPickerValue,
      setFieldValue,
      setFieldTouched,
      validateAndFixEndTime,
      checkIfInvalidEndTime,
    ]
  );

  const handleTimeChange = useCallback(
    async (type: 'startTime' | 'endTime', dateTime: Date | null) => {
      if (type === 'startTime' && startPickerOpened) {
        setStartPickerValue(dateTime);
      } else if (type === 'endTime' && endPickerOpened) {
        setEndPickerValue(dateTime);
        checkIfInvalidEndTime(dateTime);
      } else {
        await updateTimeFormValue(type, dateTime);
      }
    },
    [
      checkIfInvalidEndTime,
      endPickerOpened,
      startPickerOpened,
      updateTimeFormValue,
    ]
  );

  useEffect(() => {
    if (!startPickerOpened && startPickerValue) {
      void updateTimeFormValue('startTime', startPickerValue);
    } else if (!endPickerOpened && endPickerValue) {
      void updateTimeFormValue('endTime', endPickerValue);
    }
  }, [
    startPickerValue,
    endPickerValue,
    startPickerOpened,
    endPickerOpened,
    updateTimeFormValue,
  ]);

  const submitButtonTooltip = useMemo(() => {
    if (isValid && !isUntouched) return '';
    return isUntouched
      ? t('common:tooltip.formUntouched')
      : t('error:INVALID_FORM');
  }, [t, isValid, isUntouched]);

  const handleStartTimeNow = async () => {
    const nowTimestamp = new Date().getTime();
    const roundedNowTimestamp = Math.floor(nowTimestamp / MINUTE) * MINUTE;
    await setFieldValue('startTime', new Date(roundedNowTimestamp));
    await setFieldTouched('startTime', true);
  };

  const handleDurationSelect = async (valueInMinutes: number) => {
    if (!values.startTime) return;
    const endTime = new Date(addMinutes(values.startTime, valueInMinutes));
    await setFieldValue('endTime', endTime);
    await setFieldTouched('endTime', true);
    setFieldError('endTime', undefined);
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
        <Button onClick={handleStartTimeNow} disabled={startTimeDisabled}>
          {t('form.setStartNow')}
        </Button>
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
          disablePast={!initialValues.startTime}
          disabled={startTimeDisabled}
          renderInput={(params) => (
            <TextField
              name="startTime"
              sx={{ flex: 1 }}
              {...params}
              helperText={startTimeDisabled ? t('form.alreadyStarted') : ' '}
              {...(touched.startTime &&
                !!errors.startTime && { error: !!errors.startTime })}
            />
          )}
          onChange={(value) => handleTimeChange('startTime', value)}
          onOpen={() => setStartPickerOpened(true)}
          onClose={() => setStartPickerOpened(false)}
        />

        <ArrowRightAlt sx={{ mt: '-20px' }} />

        <DateTimePicker
          label={t('form.placeholder.endTime')}
          value={values.endTime}
          disablePast={!initialValues.endTime}
          minDateTime={
            values.startTime
              ? addMinutes(values.startTime, MIN_TASK_DURATION_IN_MINUTES)
              : null
          }
          maxDateTime={maxEndTime}
          renderInput={(params) => (
            <TextField
              name="endTime"
              sx={{ flex: 1 }}
              {...params}
              helperText=" "
              {...(touched.endTime &&
                !!errors.endTime && { error: !!errors.endTime })}
            />
          )}
          onChange={(value) => handleTimeChange('endTime', value)}
          onOpen={() => setEndPickerOpened(true)}
          onClose={() => setEndPickerOpened(false)}
        />
      </Box>

      <LabelledCheckbox
        label={t('form.mandatoryLabel')}
        name="mandatory"
        checked={values.mandatory}
        onBlur={handleBlur}
        onChange={(e) => setFieldValue('mandatory', e.target.checked)}
      />

      {values.startTime && values.endTime && (
        <Box>
          <Typography>
            {t('common:duration')}:{' '}
            <Typography
              component="span"
              color={errors.endTime ? 'error' : 'text'}
              fontWeight="bold"
            >
              <Tooltip title={errors.endTime || ''}>
                <span>
                  {getReadableTimeDifference(
                    values.endTime,
                    values.startTime,
                    t
                  )}
                  {Boolean(errors.endTime) && (
                    <HelpOutline sx={{ fontSize: 16, ml: '3px', mb: '-3px' }} />
                  )}
                </span>
              </Tooltip>
            </Typography>
          </Typography>

          <Typography>
            {t('form.currentType')}: <strong>{t(values.type)}</strong>
          </Typography>

          <Typography>
            {t('form.currentMandatory')}:{' '}
            <strong>{t(`form.mandatory.${String(values.mandatory)}`)}</strong>
          </Typography>

          {typeWarningVisible && !isEditMode && (
            <Typography color="text.warning">
              {t('form.typeChangedTo.' + values.type)}
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
