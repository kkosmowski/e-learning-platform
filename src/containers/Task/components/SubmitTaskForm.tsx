import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useMemo, useRef } from 'react';
import { AttachFile } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { Task, TaskSubmissionForm } from 'shared/types/task';
import {
  TASK_MAX_FILE_SIZE,
  TASK_MAX_MESSAGE_LENGTH,
} from 'shared/consts/task';
import { bytesToKilobytesOrMegabytes } from 'shared/utils/file.utils';
import { MEGABYTE } from 'shared/consts/file';
import { fileTooBigError } from 'shared/consts/error';

interface SubmitTaskFormProps {
  task: Task;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
}

export default function SubmitTaskForm(props: SubmitTaskFormProps) {
  //@todo use `task` later to choose what options to display, like attaching an images, files and so on
  const { task, onCancel, onSubmit } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation('task');

  const handleFormSubmit = (values: TaskSubmissionForm) => {
    const formData = new FormData();

    formData.append('comment', values.comment);

    if (values.file) {
      formData.append('file', values.file || '');
    }

    onSubmit(formData);
  };

  const formik = useFormik<TaskSubmissionForm>({
    initialValues: {
      comment: '',
      file: null,
    },
    validationSchema: yup.object().shape({
      comment: yup.string().max(TASK_MAX_MESSAGE_LENGTH),
      file: yup
        .mixed()
        .nullable()
        .test(
          'fileSize',
          fileTooBigError,
          (file) => !file || file.size <= TASK_MAX_FILE_SIZE
        )
        .nullable(),
    }),
    onSubmit: handleFormSubmit,
  });
  const { errors, handleChange, handleSubmit, isValid, setFieldValue, values } =
    formik;

  const fileNameAndSize = useMemo(() => {
    if (values.file) {
      const { name, size } = values.file;
      return `${name} (${bytesToKilobytesOrMegabytes(
        size,
        MEGABYTE,
        2,
        true
      )})`;
    }
    return '';
  }, [values.file]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue('file', event.target.files ? event.target.files[0] : null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <TextField
            placeholder={t('taskMessagePlaceholder')}
            rows={4}
            sx={{ mb: 0.5 }}
            multiline
            fullWidth
            autoFocus
            name="comment"
            inputProps={{
              maxLength: TASK_MAX_MESSAGE_LENGTH,
            }}
            value={values.comment}
            onChange={handleChange}
          />

          {errors.file && (
            <Typography color="error" sx={{ fontSize: 14 }}>
              {t(errors.file, {
                maxSize: bytesToKilobytesOrMegabytes(
                  TASK_MAX_FILE_SIZE,
                  MEGABYTE,
                  0,
                  true
                ),
              })}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
            <Button
              component="label"
              variant="outlined"
              sx={{
                minWidth: 36,
                maxWidth: 36,
                minHeight: 36,
                maxHeight: 36,
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
              }}
            >
              <AttachFile />
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                onChange={handleFileChange}
                hidden
              />
            </Button>

            <Typography>
              {values.comment.length}/{TASK_MAX_MESSAGE_LENGTH}
            </Typography>

            <Typography>{fileNameAndSize}</Typography>

            <Button color="secondary" sx={{ ml: 'auto' }} onClick={onCancel}>
              {t('common:cancel')}
            </Button>

            {/* @todo make button valid only when there is at least one of: text message and file */}
            <Button type="submit" variant="contained" disabled={!isValid}>
              {t('common:submit')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
}
