import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getFullSubject, getSubject, updateSubject } from 'api/subject';
import {
  GetFullSubjectResponse,
  GetSubjectResponse,
  SimpleSubject,
  SubjectWithClass,
  UpdateSubjectResponse,
} from 'shared/types/subject';
import {
  mapSimpleSubjectDtoToSimpleSubject,
  mapSubjectToUpdateSubjectPayload,
  mapSubjectWithClassDtoDtoToSubjectWithClass,
} from 'shared/utils/subject.utils';
import { getErrorDetail } from 'shared/utils/common.utils';
import { User } from 'shared/types/user';
import { useAuth } from 'contexts/auth';

export function useSubjectQuery(
  subjectId: string | undefined,
  options: {
    full?: boolean;
    simple?: boolean;
  }
) {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { t } = useTranslation('settings');

  const navigateBack = () => {
    navigate('..');
  };

  const fetchQuery = useQuery<GetSubjectResponse, AxiosError, SimpleSubject>(
    ['subject', subjectId],
    () => getSubject(subjectId || ''),
    {
      enabled: Boolean(subjectId && currentUser && options?.simple),
      select: ({ data }) => mapSimpleSubjectDtoToSimpleSubject(data),
      retry: false,
      onSuccess: () => {
        setErrorText('');
      },
      onError: (error) => {
        setErrorText(t(error.message));
        toast.error(t(error.message));
      },
    }
  );

  const detailedFetchQuery = useQuery<
    GetFullSubjectResponse,
    AxiosError,
    SubjectWithClass
  >(['subject', subjectId, 'full'], () => getFullSubject(subjectId || ''), {
    enabled: Boolean(subjectId && currentUser && options?.full),
    select: ({ data }) => mapSubjectWithClassDtoDtoToSubjectWithClass(data),
    retry: false,
    onSuccess: () => {
      setErrorText('');
    },
    onError: (error) => {
      setErrorText(t(error.message));
      toast.error(t(error.message));
    },
  });

  const { mutate: handleUpdate } = useMutation<
    UpdateSubjectResponse,
    AxiosError,
    User | null
  >(
    async (teacher: User | null) => {
      if (detailedFetchQuery.data && teacher) {
        return updateSubject(
          mapSubjectToUpdateSubjectPayload({
            id: detailedFetchQuery.data.id,
            teacher,
          })
        );
      } else throw new Error('Subject id is missing');
    },
    {
      onSuccess: async ({ data }) => {
        queryClient.setQueryData(['subject', subjectId, 'full'], { data });
        navigateBack();
        toast.success(t('subjects.toast.updateSuccess'));
      },
      onError: (e) => {
        setErrorText(getErrorDetail(e));
        toast.error(t('subjects.toast.updateError'));
      },
    }
  );

  return {
    simpleSubject: fetchQuery.data,
    subject: detailedFetchQuery.data,
    isLoading: fetchQuery.isLoading || detailedFetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess || detailedFetchQuery.isSuccess,
    error: errorText,
    updateSubject: handleUpdate,
    isFetched: fetchQuery.isFetched || detailedFetchQuery.isFetched,
  };
}
