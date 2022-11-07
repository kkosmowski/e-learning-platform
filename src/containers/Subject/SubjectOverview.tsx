import { TaskType } from 'shared/types/task';
import LatestGrades from './components/LatestGrades';
import LatestNotices from './components/LatestNotices';
import LatestTasks from './components/LatestTasks';
import useCustomNavigate from 'hooks/use-custom-navigate';

const getTaskRoute = (type: TaskType): string =>
  type === TaskType.Task ? 'tasks' : 'homework';

export default function SubjectOverview() {
  const { navigate } = useCustomNavigate();

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
    <>
      <LatestNotices
        onNoticeClick={navigateToNotice}
        onMoreClick={navigateToNotices}
        onCreateNotice={navigateToNoticeCreation}
      />

      <LatestGrades
        onMoreClick={navigateToGrades}
        onAssignGrade={navigateToGradeAssignment}
      />

      <LatestTasks
        type={TaskType.Task}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
        onCreateTask={navigateToTaskCreation}
      />

      <LatestTasks
        type={TaskType.Homework}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
        onCreateTask={navigateToTaskCreation}
      />
    </>
  );
}
