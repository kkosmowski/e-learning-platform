import { useParams } from 'react-router';

import { Centered } from 'shared/components/Container';
import TaskCard from 'shared/components/TaskCard';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useAuth } from 'contexts/auth';
import {
  useTasksQuery,
  useTaskSubmissionQuery,
  useTaskSubmissionsQuery,
} from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import TaskSubmissionStudentView from './features/TaskSubmissionStudentView';
import TaskSubmissionTeacherView from './features/TaskSubmissionTeacherView';

export default function Task() {
  const { navigate } = useCustomNavigate();
  const { subjectId, taskId } = useParams();
  const { currentUser } = useAuth();
  const isUserStudent = isStudent(currentUser);
  const isUserTeacher = isTeacher(currentUser);
  const {
    task: { task, update, deleteTask, isLoading, isSuccess },
  } = useTasksQuery({ taskId });
  const { taskSubmission, isSuccess: isTaskSubmissionSuccess } =
    useTaskSubmissionQuery(taskId, isUserStudent);
  const { taskSubmissions } = useTaskSubmissionsQuery(taskId, isUserTeacher);

  if (!isLoading && !task) {
    navigate('/404');
    return null;
  }

  const submissions = isUserTeacher
    ? taskSubmissions
    : taskSubmission
    ? [taskSubmission]
    : [];

  const handleFinishNow = (): void => {
    if (!subjectId || !taskId) return;
    update({ endTime: new Date() });
  };

  const handleDelete = (): void => {
    if (!subjectId || !taskId) return;
    deleteTask(taskId);
  };

  return (
    <Centered innerSx={{ gap: 4 }}>
      {isSuccess && task ? (
        <>
          <TaskCard
            task={task}
            submissions={submissions}
            onFinishNow={handleFinishNow}
            onDelete={handleDelete}
          />

          {isUserStudent && isTaskSubmissionSuccess && (
            <TaskSubmissionStudentView task={task} />
          )}

          {isUserTeacher && <TaskSubmissionTeacherView task={task} />}
        </>
      ) : isLoading ? (
        <PageLoading />
      ) : null}
    </Centered>
  );
}
