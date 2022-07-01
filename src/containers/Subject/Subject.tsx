import { useNavigate } from 'react-router';

import { Centered } from 'shared/components/Container';
import { notices } from 'shared/consts/notice';
import { homework, tasks } from 'shared/consts/task';
import { grades } from 'shared/consts/grade';
import { TaskType } from 'shared/types/task';
import YourGrades from './components/YourGrades';
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

  const navigateToNoticeCreation = (): void => {
    navigate(`notices/new`);
  };

  const navigateToTasks = (type: TaskType): void => {
    navigate(getTaskRoute(type));
  };

  const navigateToTask = (type: TaskType, taskId: string): void => {
    navigate(`${getTaskRoute(type)}/${taskId}`);
  };

  const navigateToTaskCreation = (type: TaskType): void => {
    navigate(`${getTaskRoute(type)}/new`);
  };

  const navigateToGrades = (): void => {
    navigate('grades');
  };

  const navigateToGradeAssignment = (): void => {
    navigate('grades/new');
  };

  return (
    <Centered>
      <LatestNotices
        notices={notices}
        onNoticeClick={navigateToNotice}
        onMoreClick={navigateToNotices}
        onCreateNotice={navigateToNoticeCreation}
      />

      <YourGrades
        grades={grades}
        onMoreClick={navigateToGrades}
        onAssignGrade={navigateToGradeAssignment}
      />

      <LatestTasks
        type={TaskType.Task}
        tasks={tasks}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
        onCreateTask={navigateToTaskCreation}
      />

      <LatestTasks
        type={TaskType.Homework}
        tasks={homework}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
        onCreateTask={navigateToTaskCreation}
      />
    </Centered>
  );
}
