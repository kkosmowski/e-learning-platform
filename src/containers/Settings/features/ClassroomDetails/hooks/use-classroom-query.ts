import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

import {
  Classroom,
  ClassroomForm,
  GetClassroomResponse,
  UpdateClassroomResponse,
} from 'shared/types/classroom';
import { getClassroom, updateClassroom } from 'api/classroom';
import {
  mapClassroomDtoToClassroom,
  mapClassroomToUpdateClassroomPayload,
} from 'shared/utils/classroom.utils';
import { getErrorDetail } from 'shared/utils/common.utils';

interface UseClassroomQueryData {
  currentClassroom: Classroom | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  updateClassroom: (values: ClassroomForm) => void;
}

export default function useClassroomQuery(
  classroomId: string | undefined
): UseClassroomQueryData {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const navigateBack = () => {
    navigate('..', { replace: false });
  };

  const fetchClassroomQuery = useQuery<
    GetClassroomResponse,
    AxiosError,
    Classroom
  >(
    ['classroom', classroomId],
    () => {
      if (classroomId) return getClassroom(classroomId);
      else throw new Error('Classroom id is missing');
    },
    {
      enabled: Boolean(classroomId),
      select: ({ data }) => mapClassroomDtoToClassroom(data),
    }
  );

  const { mutate: handleUpdate } = useMutation<
    UpdateClassroomResponse,
    AxiosError,
    ClassroomForm
  >(
    async (values: ClassroomForm) => {
      if (fetchClassroomQuery.data && values.teacher) {
        return updateClassroom(
          mapClassroomToUpdateClassroomPayload({
            id: fetchClassroomQuery.data.id,
            name: values.name,
            teacher: values.teacher,
            students: values.students,
          })
        );
      } else throw new Error('Classroom id is missing');
    },
    {
      onSuccess: async ({ data }) => {
        await queryClient.invalidateQueries(['classroom', classroomId]);
        queryClient.setQueryData(['classroom', classroomId], { data });
        navigateBack();
        toast.success('Classroom updated');
      },
      onError: (e) => {
        setError(getErrorDetail(e));
        toast.error('There was an error');
      },
    }
  );

  return {
    currentClassroom: fetchClassroomQuery.data,
    isLoading: fetchClassroomQuery.isLoading,
    isSuccess: fetchClassroomQuery.isSuccess,
    error,
    updateClassroom: handleUpdate,
  };
}
