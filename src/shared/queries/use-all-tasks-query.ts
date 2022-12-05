import { useCallback, useMemo, useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  GetTaskResponse,
  GetLatestTasksResponse,
  TaskDto,
  TaskType,
  LatestTasksDto,
  LatestTasks,
  UpdateTaskResponse,
  TaskForm,
} from 'shared/types/task';
import {
  deleteTask,
  getLatestTasks,
  getSubjectTasks,
  getTask,
  updateTask,
} from 'api/task';
import {
  mapTaskDtoToTask,
  mapTaskFormToUpdateTaskPayload,
  mapTaskSubmissionDtoToTaskSubmission,
} from 'shared/utils/task.utils';
import { useAuth } from 'contexts/auth';
import { TASK_LIST_PAGE_SIZE, VISIBLE_LATEST_TASKS } from 'shared/consts/task';
import { EmptyResponse, Paginated } from 'shared/types/shared';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { GetUsersProps } from '../types/user';

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

export function useAllTasksQuery() {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const { currentUser } = useAuth();

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
      getNumberOfFetchedTasks(allTasksQuery.data.pages) < tasksCount,
    [allTasksQuery.data, tasksCount]
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
