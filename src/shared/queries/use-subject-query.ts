import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { getFullSubject, getSubject, updateSubject } from 'api/subject';
import {
  GetFullSubjectResponse,
  GetSubjectResponse,
  SimpleSubject,
  Subject,
  UpdateSubjectResponse,
} from 'shared/types/subject';
import {
  mapSimpleSubjectDtoToSimpleSubject,
  mapSubjectDtoToSubject,
  mapSubjectToUpdateSubjectPayload,
} from 'shared/utils/subject.utils';
import { getErrorDetail } from 'shared/utils/common.utils';
import { User } from 'shared/types/user';
import useCustomNavigate from 'hooks/use-custom-navigate';

export function useSubjectQuery(
  subjectId: string | undefined,
  currentUser: User | null | undefined,
  options: {
    full?: boolean;
    simple?: boolean;
  }
) {
  const queryClient = useQueryClient();
  const { navigate } = useCustomNavigate();
  const [errorText, setErrorText] = useState('');
  const { t } = useTranslation();

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
    Subject
  >(['subject', subjectId, 'full'], () => getFullSubject(subjectId || ''), {
    enabled: Boolean(subjectId && currentUser && options?.full),
    select: ({ data }) => mapSubjectDtoToSubject(data),
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
      if (fetchQuery.data && teacher) {
        return updateSubject(
          mapSubjectToUpdateSubjectPayload({
            id: fetchQuery.data.id,
            teacher,
          })
        );
      } else throw new Error('Subject id is missing');
    },
    {
      onSuccess: async ({ data }) => {
        queryClient.setQueryData(['subject', subjectId], { data });
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
    simpleSubject: fetchQuery.data,
    subject: detailedFetchQuery.data,
    isLoading: fetchQuery.isLoading || detailedFetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess || detailedFetchQuery.isSuccess,
    error: errorText,
    updateSubject: handleUpdate,
    isFetched: fetchQuery.isFetched || detailedFetchQuery.isFetched,
  };
}
