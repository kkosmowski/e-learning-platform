import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { createUser } from 'api/user';
import { error, success } from 'colors';
import { CreateUserForm, Role } from 'shared/types/user';
import { mapCreateUserFormToCreateUserPayload } from 'shared/utils/user.utils';

export default function CreateUser() {
  const { t } = useTranslation('common');
  const [created, setCreated] = useState(false);
  const [errorText, setErrorText] = useState('');

  const onSubmit = async (userData: CreateUserForm) => {
    try {
      await createUser(mapCreateUserFormToCreateUserPayload(userData));
      setErrorText('');
      setCreated(true);
      formik.resetForm();
    } catch (error) {
      setErrorText('Wystąpił błąd');
      setCreated(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      role: Role.Student,
    },
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Niepoprawny format adresu email')
        .required('Adres email jest wymagany'),
      firstName: yup.string().required('Imię jest wymagane'),
      lastName: yup.string(),
      role: yup
        .string()
        .oneOf(Object.values(Role))
        .required('Rodzaj użytkownika musi zostać określony'),
    }),
    onSubmit,
  });

  const { errors, isValid, handleChange, handleSubmit, touched, values } =
    formik;

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          name="email"
          placeholder="Email..."
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          autoFocus
          onChange={handleChange}
        />

        <TextField
          name="firstName"
          placeholder="Imię"
          value={values.firstName}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
          onChange={handleChange}
        />

        <TextField
          name="lastName"
          placeholder="Nazwisko"
          value={values.lastName}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
          onChange={handleChange}
        />

        <Select<Role>
          name="role"
          value={values.role}
          error={touched.role && Boolean(errors.role)}
          onChange={handleChange}
        >
          {Object.values(Role).map((role: Role) => (
            <MenuItem key={role} value={role}>
              {t(role)}
            </MenuItem>
          ))}
        </Select>

        {touched.email && touched.firstName && touched.lastName && !isValid && (
          <Typography color="error">Niepoprawne dane</Typography>
        )}

        <Button variant="contained" disabled={!isValid} type="submit">
          Utwórz
        </Button>

        {created && (
          <Typography sx={{ color: success[600] }}>
            Użytkownik pomyślnie utworzony
          </Typography>
        )}

        {errorText && (
          <Typography sx={{ color: error[500] }}>{errorText}</Typography>
        )}
      </Stack>
    </form>
  );
}
