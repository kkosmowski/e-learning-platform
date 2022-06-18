import { useNavigate } from 'react-router';

import Container from 'shared/components/Container';
import { notices } from 'shared/consts/notice';
import { tasks } from 'shared/consts/task';
import LatestNotices from './components/LatestNotices';
import LatestTasks from './components/LatestTasks';

export default function Subject() {
  const navigate = useNavigate();

  const navigateToNotices = (): void => {
    navigate('notices');
  };

  const navigateToNotice = (noticeId: string): void => {
    navigate(`notices/${noticeId}`);
  };

  const navigateToTasks = (): void => {
    navigate('tasks');
  };

  const navigateToTask = (taskId: string): void => {
    navigate(`tasks/${taskId}`);
  };

  return (
    <Container>
      <LatestNotices
        notices={notices}
        onNoticeClick={navigateToNotice}
        onMoreClick={navigateToNotices}
      />

      <LatestTasks
        tasks={tasks}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
      />
    </Container>
  );
}
