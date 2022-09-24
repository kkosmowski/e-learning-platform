import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { createUser } from 'api/user';
import { CreateUserForm, CreateUserResponse } from 'shared/types/user';
import { mapCreateUserFormToCreateUserPayload } from 'shared/utils/user.utils';

export default function useCreateUserQuery(
  formik: ReturnType<typeof useFormik<CreateUserForm>>
) {
  const { t } = useTranslation('settings');
  const [errorText, setErrorText] = useState('');

  const { mutate: handleCreate } = useMutation<
    CreateUserResponse,
    AxiosError,
    CreateUserForm
  >((form) => createUser(mapCreateUserFormToCreateUserPayload(form)), {
    onSuccess: async () => {
      toast.success(t('settings:users.createUser.success'));
      setErrorText('');
      formik.resetForm();
      await formik.validateForm();
    },
    onError: (error) => {
      setErrorText(t(error.message));
      toast.error(t(error.message));
    },
  });

  return {
    handleCreate,
    errorText,
  };
}
