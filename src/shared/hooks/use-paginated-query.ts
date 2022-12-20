import { useCallback } from 'react';

import { Paginated } from 'shared/types/shared';

export function usePaginatedQuery<T>(page_size: number) {
  const getNextPageParam = useCallback(
    ({ total_count }: Paginated<T>, pages: Paginated<T>[]) =>
      total_count > pages.length * page_size ? pages.length + 1 : undefined,
    [page_size]
  );

  const getPreviousPageParam = useCallback(
    ({ total_count }: Paginated<T>, pages: Paginated<T>[]) =>
      total_count > pages.length * page_size ? pages.length - 1 : undefined,
    [page_size]
  );

  const getFetchedItemsCount = useCallback(
    (pages: Paginated<T>[]) =>
      pages.reduce((sum, page) => sum + page.items.length, 0),
    []
  );

  return {
    getPreviousPageParam,
    getNextPageParam,
    getFetchedItemsCount,
  };
}
