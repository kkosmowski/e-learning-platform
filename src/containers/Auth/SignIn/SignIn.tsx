import { Button, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Key, Mail } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'contexts/auth';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'shared/consts/auth';
import {
  emailRequiredError,
  incorrectEmailError,
  invalidFormError,
  passwordRequiredError,
  passwordTooLongError,
  passwordTooShortError,
} from 'shared/consts/error';

export default function SignIn() {
  const { error, signIn } = useAuth();
  const { t } = useTranslation('auth');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnMount: true,
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .email(incorrectEmailError)
        .required(emailRequiredError),
      password: yup
        .string()
        .min(PASSWORD_MIN_LENGTH, passwordTooShortError)
        .max(PASSWORD_MAX_LENGTH, passwordTooLongError)
        .required(passwordRequiredError),
    }),
    onSubmit: signIn,
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
      <Stack spacing={2}>
        <TextField
          name="username"
          placeholder={t('placeholder.email')}
          value={values.username}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username && t(errors.username)}
          InputProps={{
            startAdornment: <Mail color="secondary" />,
          }}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <TextField
          name="password"
          placeholder={t('placeholder.password')}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password && t(errors.password)}
          InputProps={{
            startAdornment: <Key color="secondary" />,
            type: 'password',
          }}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        {touched.username && touched.password && !isValid && (
          <Typography color="error">{t(invalidFormError)}</Typography>
        )}

        {error && <Typography color="error">{t(error)}</Typography>}

        <Tooltip title={t('tooltip.fillDataToSignIn')}>
          <Stack>
            <Button variant="contained" disabled={!isValid} type="submit">
              {t('signIn')}
            </Button>
          </Stack>
        </Tooltip>

        <Typography align="center">
          {t('forgotPassword')}{' '}
          <Link to="/auth/register">{t('resetPassword')}</Link>
          {/*<br />*/}
          {/*Nie masz konta? <Link to="/auth/register">Zarejestruj się</Link>*/}
        </Typography>
      </Stack>
    </form>
  );
}
