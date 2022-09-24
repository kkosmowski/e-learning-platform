import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { GetSubjectResponse, FullSubject } from 'shared/types/subject';
import { getSubject } from 'api/subject';
import { mapFullSubjectDtoToFullSubject } from 'shared/utils/subject.utils';

export default function useSubjectQuery(subjectId: string | undefined) {
  const [errorText, setErrorText] = useState('');
  const { t } = useTranslation();

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

  return {
    currentSubject: fetchQuery.data,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
    error: errorText,
    // updateSubject
  };
}
