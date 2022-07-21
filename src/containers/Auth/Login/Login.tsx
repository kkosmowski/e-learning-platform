import { Button, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Key, Mail } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useAuth } from 'contexts/auth';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'shared/consts/auth';

export default function Login() {
  const { error, logIn } = useAuth();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnMount
      validateOnBlur
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email('Niepoprawny format adresu email')
          .required('Adres email jest wymagany'),
        password: yup
          .string()
          .min(PASSWORD_MIN_LENGTH, 'Hasło jest zbyt krótkie')
          .max(PASSWORD_MAX_LENGTH, 'Hasło jest zbyt długie')
          .required('Hasło jest wymagane'),
      })}
      onSubmit={logIn}
    >
      {({ errors, isValid, handleSubmit, handleChange, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="email"
              placeholder="Email..."
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: <Mail color="secondary" />,
              }}
              fullWidth
              onChange={handleChange}
            />

            <TextField
              name="password"
              placeholder="Password..."
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                startAdornment: <Key color="secondary" />,
                type: 'password',
              }}
              onChange={handleChange}
              fullWidth
            />

            {((touched.email && touched.password && !isValid) || error) && (
              <Typography color="error">Niepoprawne dane logowania</Typography>
            )}

            <Button variant="contained" disabled={!isValid} type="submit">
              Zaloguj się
            </Button>

            <Typography align="center">
              Zapomniane hasło? <Link to="/auth/register">Resetuj</Link>
              <br />
              Nie masz konta? <Link to="/auth/register">Zarejestruj się</Link>
            </Typography>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
