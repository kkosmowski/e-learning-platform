import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { UpdateUserForm, User } from 'shared/types/user';
import {
  emailRequiredError,
  firstNameRequiredError,
  incorrectEmailError,
  invalidFormError,
} from 'shared/consts/error';
import { error } from 'colors';

interface UserEditFormProps {
  user: User;
  onSubmit: (data: UpdateUserForm) => void;
}

export default function UserEditForm(props: UserEditFormProps) {
  const { user, onSubmit } = props;
  const { t } = useTranslation('settings');
  const navigate = useNavigate();

  const formik = useFormik<UpdateUserForm>({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email(incorrectEmailError)
        .required(emailRequiredError),
      firstName: yup.string().required(firstNameRequiredError),
      lastName: yup.string(),
    }),
    onSubmit,
  });

  const handleCancel = () => {
    navigate('..');
  };

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

        {touched.email && touched.firstName && touched.lastName && !isValid && (
          <Typography sx={{ color: error[500] }}>
            {t(invalidFormError)}
          </Typography>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            {t('common:cancel')}
          </Button>

          <Button variant="contained" disabled={!isValid} type="submit">
            {t('users.button.update')}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
