import { useMemo } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  GetTaskResponse,
  GetLatestTasksResponse,
  TaskDto,
  TaskType,
  LatestTasksDto,
  LatestTasks,
  UpdateTaskResponse,
  TaskForm,
  TaskWithSubmissionsDto,
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
  mapTaskWithSubmissionsDtoToTaskWithSubmissions,
} from 'shared/utils/task.utils';
import { useAuth } from 'contexts/auth';
import { TASK_LIST_PAGE_SIZE, VISIBLE_LATEST_TASKS } from 'shared/consts/task';
import { EmptyResponse, Paginated } from 'shared/types/shared';

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
  const navigate = useNavigate();
  const { t } = useTranslation('task');

  if (!enabled.length && subjectId) {
    console.error(
      'Tasks query: Trying to fetch subjects tasks/homework with enabled array empty.'
    );
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

  const taskQuery = useQuery<
    GetTaskResponse,
    AxiosError,
    TaskWithSubmissionsDto
  >(['task', taskId], () => getTask(taskId || ''), {
    select: ({ data }) => data,
    enabled: Boolean(currentUser && taskId),
  });

  const { mutate: update } = useMutation<
    UpdateTaskResponse,
    AxiosError,
    Partial<TaskForm>
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
        await queryClient.invalidateQueries(['task', taskId]);
        await queryClient.invalidateQueries(['tasks']);
        navigate(-1);
        toast.success(t('toast.updateSuccess', { name: data.name }));
      },
      onError: (e) => {
        toast.error(t('error:ERROR'));
      },
    }
  );

  const { mutate: deleteT } = useMutation<EmptyResponse, AxiosError, string>(
    async (id) => deleteTask(id),
    {
      onSuccess: async () => {
        queryClient.setQueryData(['task', taskId], { data: undefined });
        await queryClient.invalidateQueries(['tasks']);
        navigate('./..', { replace: true });
        toast.success(t('toast.deleteSuccess'));
      },
      onError: () => {
        toast.error(t('error:ERROR'));
      },
    }
  );

  const tasks = useMemo(
    () =>
      tasksQuery.data?.pages.map((page) =>
        page.items.map(mapTaskWithSubmissionsDtoToTaskWithSubmissions)
      ),
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
      homeworkQuery.data?.pages.map((page) =>
        page.items.map(mapTaskWithSubmissionsDtoToTaskWithSubmissions)
      ),
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
      tasks: latestTasksQuery.data?.tasks.map(
        mapTaskWithSubmissionsDtoToTaskWithSubmissions
      ),
      homework: latestTasksQuery.data?.homework.map(
        mapTaskWithSubmissionsDtoToTaskWithSubmissions
      ),
    }),
    [latestTasksQuery.data]
  );

  const task = useMemo(
    () =>
      taskQuery.data
        ? mapTaskWithSubmissionsDtoToTaskWithSubmissions(taskQuery.data)
        : undefined,
    [taskQuery.data]
  );

  return {
    task: {
      task,
      isLoading: taskQuery.isLoading,
      isSuccess: taskQuery.isSuccess,
      isError: taskQuery.isError,
      update,
      deleteTask: deleteT,
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
