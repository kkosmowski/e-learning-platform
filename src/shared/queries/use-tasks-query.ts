import { useMemo } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

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
import { getLatestTasks, getSubjectTasks, getTask, updateTask } from 'api/task';
import {
  mapTaskDtoToTask,
  mapTaskFormToUpdateTaskPayload,
} from 'shared/utils/task.utils';
import { useAuth } from 'contexts/auth';
import { TASK_LIST_PAGE_SIZE, VISIBLE_LATEST_TASKS } from 'shared/consts/task';
import { Paginated } from 'shared/types/shared';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useTranslation } from 'react-i18next';

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

export function useTasksQuery(options: {
  subjectId?: string;
  taskId?: string;
  enabled?: (TaskType | 'latest')[];
}) {
  const { subjectId, taskId, enabled = [] } = options;
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { back } = useCustomNavigate();
  const { t } = useTranslation('task');

  if (!enabled.length && subjectId) {
    console.error(
      'Tasks query: Trying to fetch subjects tasks/homework with enabled array empty.'
    );
  } else if (!subjectId && !taskId) {
    console.error('Tasks query: Neither subjectId nor taskId was provided.');
  }

  const tasksQuery = useInfiniteQuery(
    ['tasks', 'task', subjectId],
    async ({ pageParam = 1 }) => {
      const { data } = await getSubjectTasks(
        subjectId || '',
        pageParam,
        TaskType.Task
      );
      return data;
    },
    {
      getPreviousPageParam,
      getNextPageParam,
      enabled:
        Boolean(currentUser && subjectId) && enabled.includes(TaskType.Task),
    }
  );

  const homeworkQuery = useInfiniteQuery(
    ['tasks', 'homework', subjectId],
    async ({ pageParam = 1 }) => {
      const { data } = await getSubjectTasks(
        subjectId || '',
        pageParam,
        TaskType.Homework
      );
      return data;
    },
    {
      getNextPageParam,
      enabled:
        Boolean(currentUser && subjectId) &&
        enabled.includes(TaskType.Homework),
    }
  );

  const latestTasksQuery = useQuery<
    GetLatestTasksResponse,
    AxiosError,
    LatestTasksDto
  >(
    ['tasks', 'latest', subjectId],
    () => getLatestTasks(subjectId || '', VISIBLE_LATEST_TASKS),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && subjectId) && enabled.includes('latest'),
    }
  );

  const taskQuery = useQuery<GetTaskResponse, AxiosError, TaskDto>(
    ['task', taskId],
    () => getTask(taskId || ''),
    {
      select: ({ data }) => data,
      enabled: Boolean(currentUser && taskId),
    }
  );

  const { mutate: update } = useMutation<
    UpdateTaskResponse,
    AxiosError,
    TaskForm
  >(
    async (values) => {
      if (taskQuery.data) {
        return updateTask(
          mapTaskFormToUpdateTaskPayload(taskQuery.data.id, values)
        );
      } else throw new Error('Task id is missing');
    },
    {
      onSuccess: async ({ data }) => {
        queryClient.setQueryData(['task', taskId], { data });
        await queryClient.invalidateQueries(['tasks']);
        back();
        toast.success(t('toast.updateSuccess', { name: data.name }));
      },
      onError: (e) => {
        toast.error(t('error:ERROR'));
      },
    }
  );

  const tasks = useMemo(
    () =>
      tasksQuery.data?.pages.map((page) => page.items.map(mapTaskDtoToTask)),
    [tasksQuery.data]
  );

  const tasksCount = useMemo(
    () => tasksQuery.data?.pages[0].total_count || 0,
    [tasksQuery.data]
  );

  const hasNextTasksPage = useMemo(
    () =>
      tasksQuery.data &&
      getNumberOfFetchedTasks(tasksQuery.data.pages) < tasksCount,
    [tasksQuery.data, tasksCount]
  );

  const homework = useMemo(
    () =>
      homeworkQuery.data?.pages.map((page) => page.items.map(mapTaskDtoToTask)),
    [homeworkQuery.data]
  );

  const homeworkCount = useMemo(
    () => homeworkQuery.data?.pages[0].total_count || 0,
    [homeworkQuery.data]
  );

  const hasNextHomeworkPage = useMemo(
    () =>
      homeworkQuery.data &&
      getNumberOfFetchedTasks(homeworkQuery.data.pages) < homeworkCount,
    [homeworkQuery.data, homeworkCount]
  );

  const latestTasks: LatestTasks = useMemo(
    () => ({
      tasks: latestTasksQuery.data?.tasks.map(mapTaskDtoToTask),
      homework: latestTasksQuery.data?.homework.map(mapTaskDtoToTask),
    }),
    [latestTasksQuery.data]
  );

  const task = useMemo(
    () => (taskQuery.data ? mapTaskDtoToTask(taskQuery.data) : undefined),
    [taskQuery.data]
  );

  return {
    task: {
      task,
      isLoading: taskQuery.isLoading,
      isSuccess: taskQuery.isSuccess,
      isError: taskQuery.isError,
      update,
    },
    tasks: {
      items: tasks,
      isLoading: tasksQuery.isLoading,
      isSuccess: tasksQuery.isSuccess,
      isFetchingNextPage: tasksQuery.isFetchingNextPage,
      fetchNextPage: tasksQuery.fetchNextPage,
      count: tasksCount,
      hasNextPage: hasNextTasksPage,
    },
    homework: {
      items: homework,
      isLoading: homeworkQuery.isLoading,
      isSuccess: homeworkQuery.isSuccess,
      isFetchingNextPage: homeworkQuery.isFetchingNextPage,
      fetchNextPage: homeworkQuery.fetchNextPage,
      count: homeworkCount,
      hasNextPage: hasNextHomeworkPage,
    },
    latestTasks,
    latestTasksLoading: latestTasksQuery.isLoading,
    latestTasksSuccess: latestTasksQuery.isSuccess,
  };
}
