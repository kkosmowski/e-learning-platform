import { useCallback, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { TaskDto } from 'shared/types/task';
import { getFinishedOrSubmittedTasks, getSubjectTasks } from 'api/task';
import { mapTaskDtoToTask } from 'shared/utils/task.utils';
import { useAuth } from 'contexts/auth';
import { TASK_LIST_PAGE_SIZE } from 'shared/consts/task';
import { Paginated } from 'shared/types/shared';

const getNextPageParam = (
  { total_count }: Paginated<TaskDto>,
  pages: Paginated<TaskDto>[]
) =>
  total_count > pages.length * TASK_LIST_PAGE_SIZE
    ? pages.length + 1
    : undefined;

const getPreviousPageParam = (
  { total_count }: Paginated<TaskDto>,
  pages: Paginated<TaskDto>[]
) =>
  total_count > pages.length * TASK_LIST_PAGE_SIZE
    ? pages.length - 1
    : undefined;

const getNumberOfFetchedTasks = (pages: Paginated<TaskDto>[]) =>
  pages.reduce((sum, page) => sum + page.items.length, 0);

export function useFinishedOrSubmittedTasksQuery() {
  const [fetchData, setFetchData] = useState<{
    studentId: string;
    subjectId: string;
  } | null>(null);
  const { currentUser } = useAuth();

  const finishedOrSubmittedTasksQuery = useInfiniteQuery(
    [
      'tasks',
      'finished-or-submitted',
      fetchData?.subjectId,
      fetchData?.studentId,
    ],
    async ({ pageParam = 1 }) => {
      const { data } = await getFinishedOrSubmittedTasks(
        fetchData?.subjectId || '',
        fetchData?.studentId || '',
        pageParam
      );
      return data;
    },
    {
      getPreviousPageParam,
      getNextPageParam,
      enabled: Boolean(
        currentUser && fetchData?.subjectId && fetchData?.studentId
      ),
    }
  );

  const fetchTasks = useCallback(
    (data: { studentId: string; subjectId: string }) => {
      setFetchData(data);
    },
    []
  );

  const tasksCount = useMemo(
    () => finishedOrSubmittedTasksQuery.data?.pages[0].total_count || 0,
    [finishedOrSubmittedTasksQuery.data]
  );

  const hasNextTasksPage = useMemo(
    () =>
      finishedOrSubmittedTasksQuery.data &&
      getNumberOfFetchedTasks(finishedOrSubmittedTasksQuery.data.pages) <
        tasksCount,
    [finishedOrSubmittedTasksQuery.data, tasksCount]
  );

  const tasks = useMemo(
    () =>
      finishedOrSubmittedTasksQuery.data?.pages.map((page) =>
        page.items.map(mapTaskDtoToTask)
      ),
    [finishedOrSubmittedTasksQuery.data]
  );

  return {
    tasks,
    fetchTasks,
    isFetchingNextPage: finishedOrSubmittedTasksQuery.isFetchingNextPage,
    fetchNextPage: finishedOrSubmittedTasksQuery.fetchNextPage,
    hasNextTasksPage,
    isLoading: finishedOrSubmittedTasksQuery.isLoading,
    isSuccess: finishedOrSubmittedTasksQuery.isSuccess,
  };
}
