import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Task } from 'shared/types/task';
import {
  TASK_MAX_FILE_SIZE,
  TASK_MAX_MESSAGE_LENGTH,
} from 'shared/consts/task';

interface TaskAnswerFormProps {
  task: Task;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function TaskAnswerForm(props: TaskAnswerFormProps) {
  //@todo use `task` later to choose what options to display, like attaching an images, files and so on
  const { task, onCancel, onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      textMessage: '',
      file: '',
    },
    validationSchema: yup.object().shape({
      textMessage: yup.string().max(TASK_MAX_MESSAGE_LENGTH),
      file: yup
        .mixed()
        .test('fileSize', 'The file is too large', (value) => {
          if (!value?.length) return true; // file is optional
          return value[0].size <= TASK_MAX_FILE_SIZE;
        })
        .nullable(),
    }),
    onSubmit,
  });
  const { handleChange, handleSubmit, values } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <TextField
            placeholder="Type your answer or leave additional comment..."
            rows={4}
            sx={{ mb: 1 }}
            multiline
            fullWidth
            name="textMessage"
            inputProps={{
              maxLength: TASK_MAX_MESSAGE_LENGTH,
            }}
            value={values.textMessage}
            onChange={handleChange}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <AttachFile />
            </IconButton>

            <Typography>
              {values.textMessage.length}/{TASK_MAX_MESSAGE_LENGTH}
            </Typography>

            <Button color="secondary" sx={{ ml: 'auto' }} onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
}
