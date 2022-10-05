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
import { validateClassName } from 'api/class';
import { Role, User } from 'shared/types/user';
import { mapUserDtoToUser } from 'shared/utils/user.utils';
import { ClassForm } from 'shared/types/class';
import {
  classNameRequiredError,
  classNameTakenError,
  classTeacherRequiredError,
} from 'shared/consts/error';
import { defaultDebounce } from 'shared/consts/shared';

export interface UseClassFormProps {
  initialValues: ClassForm;
  submitButtonLabel: string;
  secondaryButton?: (
    formik: ReturnType<typeof useFormik<ClassForm>>
  ) => ReactNode;
  onSubmit: (form: ClassForm) => void;
  t: TFunction;
  error?: string;
}

export function useClassForm(props: UseClassFormProps) {
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
    // @todo: fetch only users that have no class assigned
    const { data } = await getUsers({
      role: [Role.Student, Role.Teacher],
      withoutGroups: true,
    });
    let teachers: User[] = [];
    let students: User[] = [];

    if (initialValues) {
      if (initialValues.teacher) {
        teachers = [initialValues.teacher];
      }

      if (initialValues.students.length) {
        students = [...initialValues.students];
      }
    }

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
  }, [initialValues]);

  useEffect(() => {
    void fetchUsers();
  }, []);

  const formik = useFormik<ClassForm>({
    initialValues,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      name: yup.string().required(classNameRequiredError),
      teacher: yup.object().nullable().required(classTeacherRequiredError),
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
      const { data: isNameValid } = await validateClassName(name);

      if (!isNameValid && name !== initialValues.name) {
        setFieldError('name', classNameTakenError);
      }
    }, defaultDebounce),
    [setFieldError]
  );

  useEffect(() => {
    if (!initialRun.current && values.name) {
      void validateName(values.name);
    }
    initialRun.current = false;
  }, [validateName, values.name]);

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
        placeholder={t('classes.create.placeholder.name')}
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
            placeholder={t('classes.create.placeholder.teacher')}
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
            placeholder={t('classes.create.placeholder.students')}
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
