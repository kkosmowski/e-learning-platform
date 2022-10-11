import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { UpdateUserForm, User } from 'shared/types/user';
import useCustomNavigate from 'hooks/use-custom-navigate';
import {
  emailRequiredError,
  firstNameRequiredError,
  incorrectEmailError,
  invalidFormError,
} from 'shared/consts/error';
import { error } from 'colors';
import { useEffect, useMemo, useState } from 'react';

interface UserEditFormProps {
  user: User;
  onSubmit: (data: UpdateUserForm) => void;
}

export default function UserEditForm(props: UserEditFormProps) {
  const { user, onSubmit } = props;
  const { t } = useTranslation('settings');
  const [isUntouched, setIsUntouched] = useState(true);
  const { navigate } = useCustomNavigate();

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
    navigate('..', { replace: true });
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

  const submitButtonTooltip = useMemo(() => {
    if (!isValid || isUntouched) {
      const key = !isValid ? 'missingData' : 'formUntouched';
      return t('common:tooltip.' + key);
    }
    return '';
  }, [t, isValid, isUntouched]);

  useEffect(() => {
    setIsUntouched(
      values.email === user.email &&
        values.firstName === user.firstName &&
        values.lastName === user.lastName
    );
  }, [user, values]);

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

          <Tooltip title={submitButtonTooltip}>
            <Stack>
              <Button
                variant="contained"
                disabled={!isValid || isUntouched}
                type="submit"
              >
                {t('users.button.update')}
              </Button>
            </Stack>
          </Tooltip>
        </Box>
      </Stack>
    </form>
  );
}
