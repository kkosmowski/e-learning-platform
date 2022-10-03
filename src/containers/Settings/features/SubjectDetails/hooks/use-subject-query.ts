import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { getSubject, updateSubject } from 'api/subject';
import {
  GetSubjectResponse,
  FullSubject,
  UpdateSubjectResponse,
  SubjectForm,
} from 'shared/types/subject';
import {
  mapFullSubjectDtoToFullSubject,
  mapSubjectToUpdateSubjectPayload,
} from 'shared/utils/subject.utils';
import { getErrorDetail } from 'shared/utils/common.utils';
import { useNavigate } from 'react-router';

export default function useSubjectQuery(subjectId: string | undefined) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { t } = useTranslation();

  const navigateBack = () => {
    navigate('..', { replace: false });
  };

  const fetchQuery = useQuery<GetSubjectResponse, AxiosError, FullSubject>(
    ['subject', subjectId],
    () => getSubject(subjectId || ''),
    {
      enabled: Boolean(subjectId),
      select: ({ data }) => mapFullSubjectDtoToFullSubject(data),
      onSuccess: () => {
        setErrorText('');
      },
      onError: (error) => {
        setErrorText(t(error.message));
        toast.error(t(error.message));
      },
    }
  );

  const { mutate: handleUpdate } = useMutation<
    UpdateSubjectResponse,
    AxiosError,
    SubjectForm
  >(
    async (values: SubjectForm) => {
      if (fetchQuery.data && values.teacher) {
        return updateSubject(
          mapSubjectToUpdateSubjectPayload({
            id: fetchQuery.data.id,
            name: '',
            category: values.category,
            classroom: values.classroom,
            teacher: values.teacher,
          })
        );
      } else throw new Error('Subject id is missing');
    },
    {
      onSuccess: async ({ data }) => {
        queryClient.setQueryData(['classroom', subjectId], { data });
        navigateBack();
        toast.success('Subject updated');
      },
      onError: (e) => {
        setErrorText(getErrorDetail(e));
        toast.error('There was an error');
      },
    }
  );

  return {
    currentSubject: fetchQuery.data,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
    error: errorText,
    updateSubject: handleUpdate,
  };
}
