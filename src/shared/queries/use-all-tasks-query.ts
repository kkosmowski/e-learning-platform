import { useCallback, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getSubjectTasks } from 'api/task';
import { mapTaskDtoToTask } from 'shared/utils/task.utils';
import { useAuth } from 'contexts/auth';
import { TASK_LIST_PAGE_SIZE } from 'shared/consts/task';
import { usePaginatedQuery } from 'shared/hooks';

export function useAllTasksQuery() {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const { getPreviousPageParam, getNextPageParam, getFetchedItemsCount } =
    usePaginatedQuery(TASK_LIST_PAGE_SIZE);

  const allTasksQuery = useInfiniteQuery(
    ['tasks', 'all', subjectId],
    async ({ pageParam = 1 }) => {
      const { data } = await getSubjectTasks(subjectId || '', pageParam);
      return data;
    },
    {
      getPreviousPageParam,
      getNextPageParam,
      enabled: Boolean(currentUser && subjectId),
    }
  );

  const fetchTasks = useCallback((subId: string) => {
    setSubjectId(subId);
  }, []);

  const tasksCount = useMemo(
    () => allTasksQuery.data?.pages[0].total_count || 0,
    [allTasksQuery.data]
  );

  const hasNextTasksPage = useMemo(
    () =>
      allTasksQuery.data &&
      getFetchedItemsCount(allTasksQuery.data.pages) < tasksCount,
    [allTasksQuery.data, getFetchedItemsCount, tasksCount]
  );

  const tasks = useMemo(
    () =>
      allTasksQuery.data?.pages.map((page) => page.items.map(mapTaskDtoToTask)),
    [allTasksQuery.data]
  );

  return {
    tasks,
    fetchTasks,
    isFetchingNextPage: allTasksQuery.isFetchingNextPage,
    fetchNextPage: allTasksQuery.fetchNextPage,
    hasNextTasksPage,
    isLoading: allTasksQuery.isLoading,
    isSuccess: allTasksQuery.isSuccess,
  };
}
