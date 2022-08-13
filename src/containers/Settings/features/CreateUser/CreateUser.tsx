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
import { getErrorDetail } from 'shared/utils/common.utils';
import {
  emailRequiredError,
  firstNameRequiredError,
  incorrectEmailError,
  invalidFormError,
  roleRequiredError,
  unknownError,
} from 'shared/consts/error';

export default function CreateUser() {
  const { t } = useTranslation('settings');
  const [created, setCreated] = useState(false);
  const [errorText, setErrorText] = useState('');

  const onSubmit = async (userData: CreateUserForm) => {
    try {
      await createUser(mapCreateUserFormToCreateUserPayload(userData));
      setErrorText('');
      setCreated(true);
      formik.resetForm();
    } catch (err: unknown) {
      setErrorText(getErrorDetail(err));
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
        .email(incorrectEmailError)
        .required(emailRequiredError),
      firstName: yup.string().required(firstNameRequiredError),
      lastName: yup.string(),
      role: yup.string().oneOf(Object.values(Role)).required(roleRequiredError),
    }),
    onSubmit,
  });

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
          placeholder={t('createUser.placeholder.email')}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email && t(errors.email)}
          autoFocus
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <TextField
          name="firstName"
          placeholder={t('createUser.placeholder.firstName')}
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
          placeholder={t('createUser.placeholder.lastName')}
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
          <Typography sx={{ color: error[500] }}>{invalidFormError}</Typography>
        )}

        <Button variant="contained" disabled={!isValid} type="submit">
          {t('createUser.submitButton')}
        </Button>

        {created && (
          <Typography sx={{ color: success[600] }}>
            {t('createUser.userCreated')}
          </Typography>
        )}

        {errorText && (
          <Typography sx={{ color: error[500] }}>{t(errorText)}</Typography>
        )}
      </Stack>
    </form>
  );
}