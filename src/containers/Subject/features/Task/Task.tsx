import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Centered } from 'shared/components/Container';
import { TaskCard } from 'containers/Subject/components';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { useAuth } from 'contexts/auth';
import { useTasksQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import TaskSubmissionStudentView from './features/TaskSubmissionStudentView';
import TaskSubmissionTeacherView from './features/TaskSubmissionTeacherView';

export default function Task() {
  const navigate = useNavigate();
  const { subjectId, taskId } = useParams();
  const { currentUser } = useAuth();
  const isUserStudent = isStudent(currentUser);
  const isUserTeacher = isTeacher(currentUser);
  const {
    task: { task, update, deleteTask, isLoading, isSuccess },
  } = useTasksQuery({ taskId });

  if (!isLoading && !task) {
    navigate('/404');
    return null;
  }

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
            onFinishNow={handleFinishNow}
            onDelete={handleDelete}
          />

          {isUserStudent && <TaskSubmissionStudentView task={task} />}

          {isUserTeacher && <TaskSubmissionTeacherView task={task} />}
        </>
      ) : isLoading ? (
        <PageLoading />
      ) : null}
    </Centered>
  );
}
