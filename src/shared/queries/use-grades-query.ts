import { useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { GetGradesResponse, GradeDto } from 'shared/types/grade';
import {
  evaluateNotSubmitted,
  getStudentGrades,
  getSubjectGrades,
  getTaskGrades,
} from 'api/grade';
import { useAuth } from 'contexts/auth';
import { mapGradeDtoToGrade } from 'shared/utils/grade.utils';
import { getErrorDetail } from 'shared/utils/common.utils';
import { EmptyResponse } from 'shared/types/shared';

export function useGradesQuery() {
  const { currentUser } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const { t } = useTranslation('grade');
  const queryClient = useQueryClient();

  const studentGradesQuery = useQuery<
    GetGradesResponse,
    AxiosError,
    GradeDto[]
  >(['grades', 'student', studentId], () => getStudentGrades(studentId), {
    enabled: Boolean(currentUser && studentId),
    select: ({ data }) => data,
  });

  const taskGradesQuery = useQuery<GetGradesResponse, AxiosError, GradeDto[]>(
    ['grades', 'task', taskId],
    () => getTaskGrades(taskId),
    {
      enabled: Boolean(currentUser && taskId),
      select: ({ data }) => data,
    }
  );

  const subjectGradesQuery = useQuery<
    GetGradesResponse,
    AxiosError,
    GradeDto[]
  >(['grades', 'subject', subjectId], () => getSubjectGrades(subjectId), {
    enabled: Boolean(currentUser && subjectId),
    select: ({ data }) => data,
  });

  const { mutate: bulkEvaluate } = useMutation<
    EmptyResponse,
    AxiosError,
    string
  >(evaluateNotSubmitted, {
    onSuccess: async () => {
      toast.success(t('create.toast.success'));
      await queryClient.invalidateQueries(['grades']);
      await queryClient.invalidateQueries(['task-submissions']);
    },
    onError: (err) => {
      const error = getErrorDetail(err);
      toast.error(t(error));
    },
  });

  const studentGrades = useMemo(
    () => studentGradesQuery.data?.map(mapGradeDtoToGrade),
    [studentGradesQuery.data]
  );

  const taskGrades = useMemo(
    () => taskGradesQuery.data?.map(mapGradeDtoToGrade),
    [taskGradesQuery.data]
  );

  const subjectGrades = useMemo(
    () => subjectGradesQuery.data?.map(mapGradeDtoToGrade),
    [subjectGradesQuery.data]
  );

  const isLoading = useMemo(
    () =>
      (!!studentId && studentGradesQuery.isLoading) ||
      (!!taskId && taskGradesQuery.isLoading) ||
      (!!subjectId && subjectGradesQuery.isLoading),
    [
      studentGradesQuery.isLoading,
      studentId,
      subjectGradesQuery.isLoading,
      subjectId,
      taskGradesQuery.isLoading,
      taskId,
    ]
  );

  const isSuccess = useMemo(
    () =>
      (!!studentId && studentGradesQuery.isSuccess) ||
      (!!taskId && taskGradesQuery.isSuccess) ||
      (!!subjectId && subjectGradesQuery.isSuccess),
    [
      studentGradesQuery.isSuccess,
      studentId,
      subjectGradesQuery.isSuccess,
      subjectId,
      taskGradesQuery.isSuccess,
      taskId,
    ]
  );

  return {
    studentGrades,
    taskGrades,
    subjectGrades,
    isLoading,
    isSuccess,
    fetchStudentGrades: setStudentId,
    fetchTaskGrades: setTaskId,
    fetchSubjectGrades: setSubjectId,
    bulkEvaluate,
  };
}
