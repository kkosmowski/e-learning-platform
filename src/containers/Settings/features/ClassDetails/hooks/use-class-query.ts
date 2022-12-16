import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Class,
  ClassForm,
  GetClassResponse,
  UpdateClassResponse,
} from 'shared/types/class';
import { getClass, updateClass } from 'api/class';
import {
  mapClassDtoToClass,
  mapClassToUpdateClassPayload,
} from 'shared/utils/class.utils';
import { getErrorDetail } from 'shared/utils/common.utils';

interface UseClassQueryData {
  currentClass: Class | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  updateClass: (values: ClassForm) => void;
}

export default function useClassQuery(
  classId: string | undefined
): UseClassQueryData {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { t } = useTranslation('settings');

  const navigateBack = () => {
    navigate('..');
  };

  const fetchClassQuery = useQuery<GetClassResponse, AxiosError, Class>(
    ['class', classId],
    () => {
      if (classId) return getClass(classId);
      else throw new Error('Class id is missing');
    },
    {
      enabled: Boolean(classId),
      select: ({ data }) => mapClassDtoToClass(data),
    }
  );

  const { mutate: handleUpdate } = useMutation<
    UpdateClassResponse,
    AxiosError,
    ClassForm
  >(
    async (values) => {
      if (fetchClassQuery.data && values.teacher) {
        return updateClass(
          mapClassToUpdateClassPayload({
            id: fetchClassQuery.data.id,
            name: values.name,
            teacher: values.teacher,
            students: values.students,
          })
        );
      } else throw new Error('Class id is missing');
    },
    {
      onSuccess: async ({ data }) => {
        queryClient.setQueryData(['class', classId], { data });
        await queryClient.invalidateQueries({ queryKey: ['userWithDetails'] });
        await queryClient.invalidateQueries({ queryKey: ['userWithDetails'] });
        navigateBack();
        toast.success(t('classes.toast.updateSuccess'));
      },
      onError: (e) => {
        setError(getErrorDetail(e));
        toast.error(t('classes.toast.updateError'));
      },
    }
  );

  return {
    currentClass: fetchClassQuery.data,
    isLoading: fetchClassQuery.isLoading,
    isSuccess: fetchClassQuery.isSuccess,
    error,
    updateClass: handleUpdate,
  };
}
