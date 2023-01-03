import { ChangeEvent } from 'react';
import { Button, Stack, TextField, Tooltip } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Key } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/auth';
import {
  passwordRequiredError,
  passwordsMustMatch,
  passwordTooLongError,
  passwordTooShortError,
} from 'shared/consts/error';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'shared/consts/auth';

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const { authToken } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  if (!authToken) {
    navigate('/auth');
  }

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      repeatPassword: '',
    },
    validateOnMount: true,
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      newPassword: yup
        .string()
        .min(PASSWORD_MIN_LENGTH, passwordTooShortError)
        .max(PASSWORD_MAX_LENGTH, passwordTooLongError)
        .required(passwordRequiredError),
      repeatPassword: yup
        .string()
        .test('passwords-match', t(passwordsMustMatch), function (value) {
          return this.parent.newPassword === value;
        })
        .required(passwordRequiredError),
    }),
    onSubmit: ({ newPassword }) => {
      if (authToken) {
        changePassword(newPassword, authToken);
      }
    },
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

  const onChange = (event: ChangeEvent) => {
    handleChange(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          name="newPassword"
          placeholder={t('placeholder.newPassword')}
          value={values.newPassword}
          error={touched.newPassword && Boolean(errors.newPassword)}
          helperText={
            touched.newPassword && errors.newPassword && t(errors.newPassword)
          }
          InputProps={{
            startAdornment: <Key color="secondary" />,
            type: 'password',
          }}
          onBlur={handleBlur}
          onChange={onChange}
        />

        <TextField
          name="repeatPassword"
          placeholder={t('placeholder.repeatPassword')}
          value={values.repeatPassword}
          error={touched.repeatPassword && Boolean(errors.repeatPassword)}
          helperText={
            touched.repeatPassword &&
            errors.repeatPassword &&
            t(errors.repeatPassword)
          }
          InputProps={{
            startAdornment: <Key color="secondary" />,
            type: 'password',
          }}
          onBlur={handleBlur}
          onChange={onChange}
        />

        <Tooltip title={t('tooltip.fillDataToSignIn')}>
          <Stack>
            <Button variant="contained" disabled={!isValid} type="submit">
              {t('changePassword')}
            </Button>
          </Stack>
        </Tooltip>
      </Stack>
    </form>
  );
}
