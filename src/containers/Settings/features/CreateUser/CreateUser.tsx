import { useFormik } from 'formik';
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

import { error } from 'colors';
import { CreateUserForm, Role } from 'shared/types/user';
import {
  emailRequiredError,
  firstNameRequiredError,
  incorrectEmailError,
  invalidFormError,
  roleRequiredError,
} from 'shared/consts/error';
import useCreateUserQuery from './hooks/use-create-user-query';
import { useRef } from 'react';

export default function CreateUser() {
  const { t } = useTranslation('settings');
  const emailInputRef = useRef<HTMLInputElement>();

  const formik = useFormik<CreateUserForm>({
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
        .email(incorrectEmailError)
        .required(emailRequiredError),
      firstName: yup.string().required(firstNameRequiredError),
      lastName: yup.string(),
      role: yup.string().oneOf(Object.values(Role)).required(roleRequiredError),
    }),
    onSubmit,
  });

  const { handleCreate, errorText } = useCreateUserQuery(formik);

  function onSubmit(values: CreateUserForm) {
    handleCreate(values);
    setTimeout(() => {
      emailInputRef.current?.focus();
    });
  }

  const {
    errors,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
  } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <TextField
          name="email"
          placeholder={t('users.form.placeholder.email')}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email && t(errors.email)}
          autoFocus
          inputProps={{
            ref: emailInputRef,
          }}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <TextField
          name="firstName"
          placeholder={t('users.form.placeholder.firstName')}
          value={values.firstName}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={
            touched.firstName && errors.firstName && t(errors.firstName)
          }
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <TextField
          name="lastName"
          placeholder={t('users.form.placeholder.lastName')}
          value={values.lastName}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName && t(errors.lastName)}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <Select<Role>
          name="role"
          value={values.role}
          error={touched.role && Boolean(errors.role)}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {Object.values(Role).map((role: Role) => (
            <MenuItem key={role} value={role}>
              {t(`common:${role}`)}
            </MenuItem>
          ))}
        </Select>

        {touched.email && touched.firstName && touched.lastName && !isValid && (
          <Typography sx={{ color: error[500] }}>
            {t(invalidFormError)}
          </Typography>
        )}

        <Button variant="contained" disabled={!isValid} type="submit">
          {t('users.button.create')}
        </Button>

        {errorText && (
          <Typography sx={{ color: error[500] }}>{t(errorText)}</Typography>
        )}
      </Stack>
    </form>
  );
}
