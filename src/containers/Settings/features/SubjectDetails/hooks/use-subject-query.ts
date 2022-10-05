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
import { User } from 'shared/types/user';
import useCustomNavigate from 'hooks/use-custom-navigate';

export default function useSubjectQuery(subjectId: string | undefined) {
  const queryClient = useQueryClient();
  const { navigate } = useCustomNavigate();
  const [errorText, setErrorText] = useState('');
  const { t } = useTranslation();

  const navigateBack = () => {
    navigate('..');
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
    currentSubject: fetchQuery.data,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
    error: errorText,
    updateSubject: handleUpdate,
  };
}
