import { useParams } from 'react-router';

export default function Users() {
  const { type } = useParams<{ type: 'teachers' | 'students' }>();

  return <>Users of type {type}</>;
}
