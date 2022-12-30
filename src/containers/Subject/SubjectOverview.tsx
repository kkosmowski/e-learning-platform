import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { TaskType } from 'shared/types/task';
import { LatestGrades, LatestNotices, LatestTasks } from './components';

const getTaskRoute = (type: TaskType): string =>
  type === TaskType.Task ? 'tasks' : 'homework';

export default function SubjectOverview() {
  const { subjectId } = useParams<{ subjectId: string }>();
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

  if (!subjectId) {
    navigate('/404');
    return null;
  }

  return (
    <>
      <LatestNotices
        subjectId={subjectId}
        onNoticeClick={navigateToNotice}
        onMoreClick={navigateToNotices}
        onCreateNotice={navigateToNoticeCreation}
      />

      <LatestGrades
        subjectId={subjectId}
        onMoreClick={navigateToGrades}
        onAssignGrade={navigateToGradeAssignment}
      />

      <LatestTasks
        subjectId={subjectId}
        type={TaskType.Task}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
        onCreateTask={navigateToTaskCreation}
      />

      <LatestTasks
        subjectId={subjectId}
        type={TaskType.Homework}
        onTaskClick={navigateToTask}
        onMoreClick={navigateToTasks}
        onCreateTask={navigateToTaskCreation}
      />
    </>
  );
}
