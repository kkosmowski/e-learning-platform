import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Autocomplete, Box, Button, debounce, TextField } from '@mui/material';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';
import { CreateClassroomForm } from 'shared/types/classroom';
import {
  classroomNameRequiredError,
  classroomNameTakenError,
  classroomTeacherRequiredError,
} from 'shared/consts/error';
import { getErrorDetail } from 'shared/utils/common.utils';
import { mapUserDtoToUser } from 'shared/utils/user.utils';
import { Role, User } from 'shared/types/user';
import { getUsers } from 'api/user';
import { createClassroom, validateClassromName } from 'api/group';
import { defaultDebounce } from 'shared/consts/shared';

export default function CreateClassroom() {
  const { t } = useTranslation('settings');
  const [studentsList, setStudentsList] = useState<User[]>([]);
  const [teachersList, setTeachersList] = useState<User[]>([]);
  const initialRun = useRef(true);

  const fetchUsers = useCallback(async () => {
    // @todo: fetch only users that have no classroom assigned
    const { data } = await getUsers([Role.Student, Role.Teacher]);
    const teachers: User[] = [];
    const students: User[] = [];

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
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (formValues: CreateClassroomForm) => {
    try {
      await createClassroom(formValues);
      toast.success(t('classrooms.create.createSuccessToast', { name }));
    } catch (err: unknown) {
      const error = getErrorDetail(err);
      toast.error(t(error));
    }
  };

  const formik = useFormik<CreateClassroomForm>({
    initialValues: {
      name: '',
      teacher: null,
      students: [],
    },
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      name: yup.string().required(classroomNameRequiredError),
      teacher: yup.object().nullable().required(classroomTeacherRequiredError),
      students: yup.array(),
    }),
    onSubmit: handleCreate,
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
      const { data: isNameValid } = await validateClassromName(name);

      if (!isNameValid) {
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

  const handleCreateAndShow = async () => {
    await handleCreate(values);
    // @todo navigate to the classroom
  };

  const handleTeacherChange = (event: SyntheticEvent, value: User | null) => {
    setFieldValue('teacher', value);
  };

  const handleStudentsChange = (
    event: SyntheticEvent,
    value: User | User[]
  ) => {
    setFieldValue('students', value);
  };

  return (
    <>
      <ViewHeader title={t('classrooms.create.title')} />

      <Centered>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 600,
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
                value={values.teacher}
                error={touched.teacher && Boolean(errors.teacher)}
                helperText={
                  touched.teacher && errors.teacher && t(errors.teacher)
                }
                onBlur={handleBlur}
              />
            )}
            options={teachersList}
            getOptionLabel={(teacher) => teacher.fullName}
            onChange={handleTeacherChange}
          />

          <Autocomplete
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                name="students"
                placeholder={t('classrooms.create.placeholder.students')}
                value={values.students}
                error={touched.students && Boolean(errors.students)}
                helperText={
                  touched.students &&
                  errors.students &&
                  t(errors.students.toString())
                }
                onBlur={handleBlur}
              />
            )}
            options={studentsList}
            getOptionLabel={(student) => student.fullName}
            onChange={handleStudentsChange}
          />

          <Box sx={{ display: 'flex', gap: 3, '*': { flex: 1 } }}>
            <Button type="submit" variant="contained" disabled={!isValid}>
              {t('common:create')}
            </Button>

            <Button
              type="button"
              variant="contained"
              disabled={!isValid}
              color="secondary"
              onClick={handleCreateAndShow}
            >
              {t('classrooms.create.createAndShow')}
            </Button>
          </Box>
        </form>
      </Centered>
    </>
  );
}
