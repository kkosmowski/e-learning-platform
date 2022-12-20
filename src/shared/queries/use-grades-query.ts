import { useCallback, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { GetGradesResponse, GradeDto, GradeType } from 'shared/types/grade';
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
import { usePaginatedQuery } from 'shared/hooks';
import { GRADES_PAGE_SIZE } from 'shared/consts/grade';

export function useGradesQuery() {
  const { currentUser } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [subjectGradesType, setSubjectGradesType] = useState<
    GradeType[] | null
  >(null);
  const { t } = useTranslation('grade');
  const queryClient = useQueryClient();
  const { getPreviousPageParam, getNextPageParam, getFetchedItemsCount } =
    usePaginatedQuery(GRADES_PAGE_SIZE);

  const studentGradesQuery = useInfiniteQuery(
    ['grades', 'student', studentId],
    async ({ pageParam = 1 }) => {
      const { data } = await getStudentGrades(studentId, pageParam);
      return data;
    },
    {
      getPreviousPageParam,
      getNextPageParam,
      enabled: Boolean(currentUser && studentId),
    }
  );

  const taskGradesQuery = useQuery<GetGradesResponse, AxiosError, GradeDto[]>(
    ['grades', 'task', taskId],
    () => getTaskGrades(taskId),
    {
      enabled: Boolean(currentUser && taskId),
      select: ({ data }) => data,
    }
  );

  const subjectGradesQuery = useInfiniteQuery(
    [
      'grades',
      'subject',
      subjectId,
      subjectGradesType ? subjectGradesType.join() : 'all',
    ],
    async ({ pageParam = 1 }) => {
      const { data } = await getSubjectGrades(
        subjectId,
        subjectGradesType,
        pageParam
      );
      return data;
    },
    {
      getPreviousPageParam,
      getNextPageParam,
      enabled: Boolean(currentUser && subjectId),
    }
  );

  const fetchSubjectGrades = useCallback(
    (subjectId: string, type: GradeType[]) => {
      setSubjectGradesType(type);
      setSubjectId(subjectId);
    },
    []
  );

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
    () =>
      studentGradesQuery.data?.pages.map((page) =>
        page.items.map(mapGradeDtoToGrade)
      ),
    [studentGradesQuery.data]
  );

  const studentGradesCount = useMemo(
    () => studentGradesQuery.data?.pages[0].total_count || 0,
    [studentGradesQuery.data]
  );

  const hasNextStudentGradesPage = useMemo(
    () =>
      studentGradesQuery.data &&
      getFetchedItemsCount(studentGradesQuery.data.pages) < studentGradesCount,
    [studentGradesQuery.data, getFetchedItemsCount, studentGradesCount]
  );

  const taskGrades = useMemo(
    () => taskGradesQuery.data?.map(mapGradeDtoToGrade),
    [taskGradesQuery.data]
  );

  const subjectGrades = useMemo(
    () =>
      subjectGradesQuery.data?.pages.map((page) =>
        page.items.map(mapGradeDtoToGrade)
      ),
    [subjectGradesQuery.data]
  );

  const subjectGradesCount = useMemo(
    () => subjectGradesQuery.data?.pages[0].total_count || 0,
    [subjectGradesQuery.data]
  );

  const hasNextSubjectGradesPage = useMemo(
    () =>
      subjectGradesQuery.data &&
      getFetchedItemsCount(subjectGradesQuery.data.pages) < subjectGradesCount,
    [subjectGradesQuery.data, getFetchedItemsCount, subjectGradesCount]
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
    isFetchingNextSubjectGradesPage: subjectGradesQuery.isFetchingNextPage,
    hasNextSubjectGradesPage,
    fetchNextSubjectGradesPage: subjectGradesQuery.fetchNextPage,
    isFetchingNextStudentGradesPage: studentGradesQuery.isFetchingNextPage,
    hasNextStudentGradesPage,
    fetchNextStudentGradesPage: studentGradesQuery.fetchNextPage,
    isLoading,
    isSuccess,
    fetchStudentGrades: setStudentId,
    fetchTaskGrades: setTaskId,
    fetchSubjectGrades,
    bulkEvaluate,
  };
}
