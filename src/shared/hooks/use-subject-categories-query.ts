import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  CreateSubjectCategoryResponse,
  GetSubjectCategoriesResponse,
  SubjectCategory,
  UpdateSubjectCategoryResponse,
} from 'shared/types/subject';
import {
  createSubjectCategory,
  deleteSubjectCategory,
  getSubjectCategories,
  updateSubjectCategory,
} from 'api/subject';

export function useSubjectCategoriesQuery() {
  const { t } = useTranslation('settings');
  const queryClient = useQueryClient();

  const fetchQuery = useQuery<
    GetSubjectCategoriesResponse,
    AxiosError,
    SubjectCategory[]
  >(['subject-categories'], getSubjectCategories, {
    select: ({ data }) => data,
  });

  const { mutate: handleCreate } = useMutation<
    CreateSubjectCategoryResponse,
    AxiosError,
    string
  >(createSubjectCategory, {
    onSuccess: async ({ data }) => {
      toast.success(
        t('subjectCategories.createSuccessToast', { name: data.name })
      );
      queryClient.setQueryData(['subject-categories'], {
        data: fetchQuery.data ? [...fetchQuery.data, data] : [data],
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(t(error.message));
    },
  });

  const { mutate: handleUpdate } = useMutation<
    UpdateSubjectCategoryResponse,
    AxiosError,
    SubjectCategory
  >(updateSubjectCategory, {
    onSuccess: async ({ data }) => {
      toast.success(t('subjectCategories.updateSuccessToast'));
      queryClient.setQueryData(['subject-categories'], {
        data: fetchQuery.data?.map((category) =>
          category.id === data.id ? data : category
        ),
      });
    },
    onError: (error) => {
      toast.error(t(error.message));
    },
  });

  const { mutate: handleDelete } = useMutation<string, AxiosError, string>(
    async (categoryId) => {
      await deleteSubjectCategory(categoryId);
      return categoryId;
    },
    {
      onSuccess: async (categoryId) => {
        toast.success(t('subjectCategories.deleteSuccessToast'));
        queryClient.setQueryData(['subject-categories'], {
          data: fetchQuery.data?.filter(
            (category) => category.id !== categoryId
          ),
        });
      },
      onError: (error) => {
        toast.error(t(error.message));
      },
    }
  );

  return {
    subjectCategories: fetchQuery.data,
    isLoading: fetchQuery.isLoading,
    isSuccess: fetchQuery.isSuccess,
    createSubjectCategory: handleCreate,
    updateSubjectCategory: handleUpdate,
    deleteSubjectCategory: handleDelete,
  };
}
