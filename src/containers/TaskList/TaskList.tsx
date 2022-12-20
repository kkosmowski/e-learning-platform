import { Fragment, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Masonry } from '@mui/lab';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { Centered } from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { TaskType } from 'shared/types/task';
import { useTasksQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import SectionTitle from 'shared/components/SectionTitle';

export default function TaskList({ type }: { type: TaskType }) {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { t } = useTranslation('task');
  const isTypeTask = type === TaskType.Task;
  const { [isTypeTask ? 'tasks' : 'homework']: query } = useTasksQuery({
    subjectId,
    enabled: [type],
  });
  const {
    items,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = query;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const navigateToTask = (taskId: string) => {
    navigate(taskId);
  };

  return (
    <Centered>
      <SectionTitle>{t(`title.${type}`)}</SectionTitle>

      {isSuccess && items?.length ? (
        <Masonry columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
          {items.map((page, index) => (
            <Fragment key={index}>
              {page.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  short
                  onClick={() => navigateToTask(task.id)}
                />
              ))}
            </Fragment>
          ))}

          {hasNextPage && (
            <Button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {t('common:loadMore')}
            </Button>
          )}
        </Masonry>
      ) : isLoading ? (
        <PageLoading />
      ) : (
        <Typography color="text.secondary">{t(`noItems.${type}`)}</Typography>
      )}
    </Centered>
  );
}
