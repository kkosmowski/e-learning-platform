import { useTaskSubmissionsQuery } from 'shared/queries';
import { Task } from 'shared/types/task';
import TaskSubmissionList from '../components/TaskSubmissionList';

interface TaskSubmissionTeacherViewProps {
  task: Task;
}

export default function TaskSubmissionTeacherView(
  props: TaskSubmissionTeacherViewProps
) {
  const { task } = props;
  const { taskSubmissions } = useTaskSubmissionsQuery(task.id);

  return <TaskSubmissionList submissions={taskSubmissions} />;
}
