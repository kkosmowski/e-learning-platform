import { TaskType } from 'shared/types/task';

interface CreateNewTaskProps {
  type: TaskType;
}

export default function CreateNewTask(props: CreateNewTaskProps) {
  const { type } = props;

  return <>Create new {type}!</>;
}
