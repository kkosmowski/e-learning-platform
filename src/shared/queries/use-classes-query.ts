import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getClasses } from 'api/class';
import { usePaginatedQuery } from 'shared/hooks';
import { CLASS_PAGE_SIZE } from 'shared/consts/class';
import { mapSimpleClassDtoToSimpleClass } from 'shared/utils/class.utils';

export function useClassesQuery() {
  const { getPreviousPageParam, getNextPageParam, getFetchedItemsCount } =
    usePaginatedQuery(CLASS_PAGE_SIZE);
  const fetchQuery = useInfiniteQuery(
    ['classes'],
    async ({ pageParam = 1 }) => {
      const { data } = await getClasses(pageParam);
      return data;
    },
    {
      getPreviousPageParam,
      getNextPageParam,
    }
  );

  const classesCount = useMemo(
    () => fetchQuery.data?.pages[0].total_count || 0,
    [fetchQuery.data]
  );

  const hasNextClassesPage = useMemo(
    () =>
      fetchQuery.data &&
      getFetchedItemsCount(fetchQuery.data.pages) < classesCount,
    [fetchQuery.data, getFetchedItemsCount, classesCount]
  );

  const classes = useMemo(
    () =>
      fetchQuery.data?.pages.map((page) =>
        page.items.map(mapSimpleClassDtoToSimpleClass)
      ),
    [fetchQuery.data]
  );

  return {
    classes,
    isFetchingNextPage: fetchQuery.isFetchingNextPage,
    fetchNextPage: fetchQuery.fetchNextPage,
    hasNextClassesPage,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
  };
}
