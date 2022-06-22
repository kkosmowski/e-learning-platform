import { useNavigate } from 'react-router';

import Container from 'shared/components/Container';
import { notices } from 'shared/consts/notice';
import { homework, tasks } from 'shared/consts/task';
import { TaskType } from 'shared/types/task';
import LatestNotices from './components/LatestNotices';
import LatestTasks from './components/LatestTasks';

const getTaskRoute = (type: TaskType): string =>
  type === TaskType.Task ? 'tasks' : 'homework';

export default function Subject() {
  const navigate = useNavigate();

  const navigateToNotices = (): void => {
    navigate('notices');
  };

  const navigateToNotice = (noticeId: string): void => {
    navigate(`notices/${noticeId}`);
  };

  const navigateToTasks = (type: TaskType): void => {
    navigate(getTaskRoute(type));
  };

  const navigateToTask = (type: TaskType, taskId: string): void => {
    navigate(`${getTaskRoute(type)}/${taskId}`);
  };

  return (
    <Container>
      <LatestNotices
        notices={notices}
        onNoticeClick={navigateToNotice}
        onMoreClick={navigateToNotices}
      />

      <LatestTasks
        type={TaskType.Task}
        tasks={tasks}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
      />

      <LatestTasks
        type={TaskType.Homework}
        tasks={homework}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
      />
    </Container>
  );
}
