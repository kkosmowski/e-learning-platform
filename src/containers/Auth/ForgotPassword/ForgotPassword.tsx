import { ChangeEvent } from 'react';
import { Button, Stack, TextField, Tooltip } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ArrowBack, Mail } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/auth';
import { emailRequiredError, incorrectEmailError } from 'shared/consts/error';
import TextButton from 'shared/components/TextButton';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  const handleBack = () => {
    navigate('/auth');
  };

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validateOnMount: true,
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .email(incorrectEmailError)
        .required(emailRequiredError),
    }),
    onSubmit: ({ username }) => {
      resetPassword(username);
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
      <TextButton type="button" sx={{ mb: 1 }} onClick={handleBack}>
        <ArrowBack fontSize="small" />
        Back
      </TextButton>

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
          onChange={onChange}
        />

        <Tooltip title={t('tooltip.fillDataToSignIn')}>
          <Stack>
            <Button variant="contained" disabled={!isValid} type="submit">
              {t('resetPassword')}
            </Button>
          </Stack>
        </Tooltip>
      </Stack>
    </form>
  );
}
