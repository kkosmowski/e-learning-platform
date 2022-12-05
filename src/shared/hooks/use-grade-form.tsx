import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TFunction } from 'i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { CreateGradeForm, GradeType } from 'shared/types/grade';
import {
  gradeValueRequiredError,
  studentRequiredError,
  subjectRequiredError,
} from 'shared/consts/error';
import {
  useAllTasksQuery,
  useSubjectsQuery,
  useSubjectStudentsQuery,
} from 'shared/queries';
import { SimpleSubject } from 'shared/types/subject';
import GradeTypeSelect from 'shared/components/GradeTypeSelect';
import GradeValueSelect from 'shared/components/GradeValueSelect';

interface UseGradeFormProps {
  initialValues: CreateGradeForm;
  submitButtonLabel: string;
  onSubmit: (form: CreateGradeForm) => void;
  t: TFunction;
}

export function useGradeForm(props: UseGradeFormProps) {
  const { initialValues, submitButtonLabel, onSubmit, t } = props;
  const [gradeType, setGradeType] = useState<GradeType>(GradeType.Assignment);
  const { students = [], fetchStudents } = useSubjectStudentsQuery();
  const {
    tasks = [],
    fetchTasks,
    hasNextTasksPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAllTasksQuery();
  const { subjects: teacherSubjects } = useSubjectsQuery({
    simple: true,
  });

  const subjectStudentsIds = useMemo(
    () => students.map(({ id }) => id),
    [students]
  );
  const subjectTasksIds = useMemo(
    () => tasks.flat().map(({ id }) => id),
    [tasks]
  );
  const getStudentOptionLabel = useCallback(
    (studentId: string) =>
      students.find((student) => student.id === studentId)?.fullName || '',
    [students]
  );
  const getTaskOptionLabel = useCallback(
    (tasksId: string) =>
      tasks.flat().find((task) => task.id === tasksId)?.name || '',
    [tasks]
  );

  const formik = useFormik<CreateGradeForm>({
    initialValues,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      subject: yup.object().nullable().required(subjectRequiredError),
      student: yup.object().nullable().required(studentRequiredError),
      task: yup.object().nullable(),
      name: yup.string().nullable(),
      value: yup.number().nullable().required(gradeValueRequiredError),
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

  useEffect(() => {
    if (values.subjectId) {
      fetchStudents(values.subjectId);
      fetchTasks(values.subjectId);
    }
  }, [fetchStudents, fetchTasks, values.subjectId]);

  const handleStudentChange = (event: SyntheticEvent, value: string | null) => {
    setFieldValue('studentId', value);
  };

  const handleTaskChange = (event: SyntheticEvent, value: string | null) => {
    setFieldValue('taskId', value);
  };

  const handleValueChange = (value: number) => {
    setFieldValue('value', value);
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
      <FormControl>
        <Select
          name="subjectId"
          disabled={!teacherSubjects?.length}
          value={values.subjectId}
          error={touched.subjectId && Boolean(errors.subjectId)}
          displayEmpty
          {...(!values.subjectId && {
            renderValue: () => t('grade:create.placeholder.subject'),
            inputProps: { sx: { opacity: 0.6 } },
          })}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {teacherSubjects?.map((subject: SimpleSubject) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <Autocomplete
          disabled={!values.subjectId}
          renderInput={(params) => (
            <TextField
              {...params}
              name="studentId"
              placeholder={t('grade:create.placeholder.student')}
              error={touched.studentId && Boolean(errors.studentId)}
              helperText={
                touched.studentId && errors.studentId && t(errors.studentId)
              }
            />
          )}
          value={values.studentId}
          options={subjectStudentsIds}
          getOptionLabel={getStudentOptionLabel}
          onBlur={handleBlur}
          onChange={handleStudentChange}
        />
        {!values.subjectId && (
          <FormHelperText>
            {t('helperText.setSubjectToSetStudent')}
          </FormHelperText>
        )}
      </FormControl>

      <Box sx={{ pl: 4 }}>
        <GradeTypeSelect value={gradeType} onChange={setGradeType} />
      </Box>

      {gradeType === GradeType.Assignment ? (
        <FormControl>
          <Autocomplete
            disabled={!values.subjectId}
            renderInput={(params) => (
              <TextField
                {...params}
                name="taskId"
                placeholder={t('grade:create.placeholder.task')}
                error={touched.taskId && Boolean(errors.taskId)}
                helperText={touched.taskId && errors.taskId && t(errors.taskId)}
              />
            )}
            value={values.taskId}
            options={subjectTasksIds}
            getOptionLabel={getTaskOptionLabel}
            onBlur={handleBlur}
            onChange={handleTaskChange}
            ListboxProps={{
              onScroll: (event) => {
                const node = event.currentTarget;
                const scrolledEnough =
                  node.scrollTop + node.clientHeight === node.scrollHeight;
                if (scrolledEnough && hasNextTasksPage && !isFetchingNextPage) {
                  void fetchNextPage();
                }
              },
            }}
          />
          {!values.subjectId && (
            <FormHelperText>
              {t('helperText.setSubjectToSetTask')}
            </FormHelperText>
          )}
        </FormControl>
      ) : (
        <FormControl>
          <TextField
            name="name"
            disabled={!values.subjectId}
            placeholder={t('grade:create.placeholder.name')}
            error={touched.taskId && Boolean(errors.taskId)}
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {!values.subjectId && (
            <FormHelperText>
              {t('helperText.setSubjectToSetName')}
            </FormHelperText>
          )}
        </FormControl>
      )}

      <GradeValueSelect value={values.value} onChange={handleValueChange} />
    </form>
  );

  return {
    formik,
    Form,
  };
}
