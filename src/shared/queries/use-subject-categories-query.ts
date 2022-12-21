import { useMemo, useRef } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  CreateSubjectCategoryResponse,
  SubjectCategory,
  UpdateSubjectCategoryResponse,
} from 'shared/types/subject';
import {
  createSubjectCategory,
  deleteSubjectCategory,
  getSubjectCategories,
  updateSubjectCategory,
} from 'api/subject';
import { SUBJECT_CATEGORIES_PAGE_SIZE } from 'shared/consts/subject';
import { usePaginatedQuery } from 'shared/hooks';
import { getErrorDetail } from 'shared/utils/common.utils';
import { ERROR_TOAST_DURATION } from 'shared/consts/error';

export function useSubjectCategoriesQuery() {
  const { t } = useTranslation('settings');
  const queryClient = useQueryClient();
  const page = useRef(0);
  const { getPreviousPageParam, getNextPageParam, getFetchedItemsCount } =
    usePaginatedQuery(SUBJECT_CATEGORIES_PAGE_SIZE);

  const fetchQuery = useInfiniteQuery(
    ['subject-categories'],
    async ({ pageParam = 1 }) => {
      page.current = pageParam;
      const { data } = await getSubjectCategories(pageParam);
      return data;
    },
    {
      getPreviousPageParam,
      getNextPageParam,
    }
  );

  const { mutate: handleCreate } = useMutation<
    CreateSubjectCategoryResponse,
    AxiosError,
    string
  >(createSubjectCategory, {
    onSuccess: async () => {
      toast.success(t('subjectCategories.toast.createSuccess'));
      await queryClient.invalidateQueries(['subject-categories']);
    },
    onError: (error) => {
      toast.error(t(getErrorDetail(error)), { duration: ERROR_TOAST_DURATION });
    },
  });

  const { mutate: handleUpdate } = useMutation<
    UpdateSubjectCategoryResponse,
    AxiosError,
    SubjectCategory
  >(updateSubjectCategory, {
    onSuccess: async () => {
      toast.success(t('subjectCategories.toast.updateSuccess'));
      await queryClient.invalidateQueries(['subject-categories']);
    },
    onError: (error) => {
      toast.error(t(getErrorDetail(error)), { duration: ERROR_TOAST_DURATION });
    },
  });

  const { mutate: handleDelete } = useMutation<string, AxiosError, string>(
    async (categoryId) => {
      await deleteSubjectCategory(categoryId);
      return categoryId;
    },
    {
      onSuccess: async (categoryId) => {
        toast.success(t('subjectCategories.toast.deleteSuccess'));
        queryClient.setQueryData(['subject-categories'], {
          data: fetchQuery.data?.pages.map((page) =>
            page.items.filter((category) => category.id !== categoryId)
          ),
        });
      },
      onError: (error) => {
        toast.error(t(getErrorDetail(error)), {
          duration: ERROR_TOAST_DURATION,
        });
      },
    }
  );

  const categoriesCount = useMemo(
    () => fetchQuery.data?.pages[0].total_count || 0,
    [fetchQuery.data]
  );

  const hasNextCategoriesPage = useMemo(
    () =>
      fetchQuery.data &&
      getFetchedItemsCount(fetchQuery.data.pages) < categoriesCount,
    [fetchQuery.data, getFetchedItemsCount, categoriesCount]
  );

  const subjectCategories = useMemo(
    () => fetchQuery.data?.pages.map((page) => page.items),
    [fetchQuery.data]
  );

  return {
    subjectCategories,
    isFetchingNextPage: fetchQuery.isFetchingNextPage,
    fetchNextPage: fetchQuery.fetchNextPage,
    hasNextCategoriesPage,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
    createSubjectCategory: handleCreate,
    updateSubjectCategory: handleUpdate,
    deleteSubjectCategory: handleDelete,
  };
}
