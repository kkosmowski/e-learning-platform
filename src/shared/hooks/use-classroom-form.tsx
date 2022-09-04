import {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Autocomplete,
  Box,
  Button,
  debounce,
  TextField,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';

import { getUsers } from 'api/user';
import { validateClassroomName } from 'api/classroom';
import { Role, User } from 'shared/types/user';
import { mapUserDtoToUser } from 'shared/utils/user.utils';
import { ClassroomForm } from 'shared/types/classroom';
import {
  classroomNameRequiredError,
  classroomNameTakenError,
  classroomTeacherRequiredError,
} from 'shared/consts/error';
import { defaultDebounce } from 'shared/consts/shared';

export interface UseClassroomFormProps {
  initialValues: ClassroomForm;
  submitButtonLabel: string;
  secondaryButton?: (
    formik: ReturnType<typeof useFormik<ClassroomForm>>
  ) => ReactNode;
  onSubmit: (form: ClassroomForm) => void;
  t: TFunction;
  error?: string;
}

export default function useClassroomForm(props: UseClassroomFormProps) {
  const {
    initialValues,
    submitButtonLabel,
    secondaryButton,
    t,
    error,
    onSubmit,
  } = props;
  const [studentsList, setStudentsList] = useState<User[]>([]);
  const [teachersList, setTeachersList] = useState<User[]>([]);
  const initialRun = useRef(true);

  const fetchUsers = useCallback(async () => {
    // @todo: fetch only users that have no classroom assigned
    const { data } = await getUsers({
      role: [Role.Student, Role.Teacher],
      withoutGroups: true,
    });
    const teachers: User[] = initialValues.teacher
      ? [initialValues.teacher]
      : [];
    const students: User[] = [...initialValues.students];

    for (const userDto of data) {
      const user = mapUserDtoToUser(userDto);

      if (user.role === Role.Student) {
        students.push(user);
      } else {
        teachers.push(user);
      }
    }

    setTeachersList(teachers);
    setStudentsList(students);
  }, [initialValues.teacher, initialValues.students]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const formik = useFormik<ClassroomForm>({
    initialValues,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      name: yup.string().required(classroomNameRequiredError),
      teacher: yup.object().nullable().required(classroomTeacherRequiredError),
      students: yup.array(),
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

  const validateName = useCallback(
    debounce(async (name: string) => {
      const { data: isNameValid } = await validateClassroomName(name);

      if (!isNameValid && name !== initialValues.name) {
        setFieldError('name', classroomNameTakenError);
      }
    }, defaultDebounce),
    [setFieldError]
  );

  useEffect(() => {
    if (!initialRun.current && values.name) {
      void validateName(values.name);
    }
    initialRun.current = false;
  }, [validateName, values]);

  const handleTeacherChange = (event: SyntheticEvent, value: User | null) => {
    setFieldValue('teacher', value);
  };

  const handleStudentsChange = (
    event: SyntheticEvent,
    value: User | User[]
  ) => {
    setFieldValue('students', value);
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
        placeholder={t('classrooms.create.placeholder.name')}
        value={values.name}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name && t(errors.name)}
        autoFocus
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            name="teacher"
            placeholder={t('classrooms.create.placeholder.teacher')}
            error={touched.teacher && Boolean(errors.teacher)}
            helperText={touched.teacher && errors.teacher && t(errors.teacher)}
          />
        )}
        value={values.teacher}
        options={teachersList}
        getOptionLabel={(teacher) => teacher.fullName}
        onBlur={handleBlur}
        onChange={handleTeacherChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />

      <Autocomplete
        multiple
        renderInput={(params) => (
          <TextField
            {...params}
            name="students"
            placeholder={t('classrooms.create.placeholder.students')}
            error={touched.students && Boolean(errors.students)}
          />
        )}
        value={values.students}
        options={studentsList}
        getOptionLabel={(student) => student.fullName}
        onBlur={handleBlur}
        onChange={handleStudentsChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />

      {error && <Typography color="error">{t(error)}</Typography>}

      <Box sx={{ display: 'flex', gap: 3, '*': { flex: 1 } }}>
        <Button type="submit" variant="contained" disabled={!isValid}>
          {submitButtonLabel}
        </Button>

        {secondaryButton && secondaryButton(formik)}
      </Box>
    </form>
  );

  return {
    formik,
    Form,
  };
}
