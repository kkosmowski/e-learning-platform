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

import { Task } from 'shared/types/task';
import {
  TASK_MAX_FILE_SIZE,
  TASK_MAX_MESSAGE_LENGTH,
} from 'shared/consts/task';
import { bytesToKilobytesOrMegabytes } from 'shared/utils/file.utils';
import { MEGABYTE } from 'shared/consts/file';
import { useTranslation } from 'react-i18next';

interface TaskAnswerFormProps {
  task: Task;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function TaskAnswerForm(props: TaskAnswerFormProps) {
  //@todo use `task` later to choose what options to display, like attaching an images, files and so on
  const { task, onCancel, onSubmit } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation('task');

  const formik = useFormik({
    initialValues: {
      textMessage: '',
      file: null,
    },
    validationSchema: yup.object().shape({
      textMessage: yup.string().max(TASK_MAX_MESSAGE_LENGTH),
      file: yup
        .mixed()
        .nullable()
        .test(
          'fileSize',
          'error:FILE_TOO_BIG',
          (file) => !file || file.size <= TASK_MAX_FILE_SIZE
        )
        .nullable(),
    }),
    onSubmit,
  });
  const { errors, handleChange, handleSubmit, isValid, setFieldValue, values } =
    formik;

  const fileNameAndSize = useMemo(() => {
    if (values.file) {
      const { name, size } = values.file as File;
      console.log(values.file);
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
            name="textMessage"
            inputProps={{
              maxLength: TASK_MAX_MESSAGE_LENGTH,
            }}
            value={values.textMessage}
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
              {values.textMessage.length}/{TASK_MAX_MESSAGE_LENGTH}
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
