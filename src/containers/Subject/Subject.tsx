import { useNavigate, useParams } from 'react-router';
import { subjects } from 'shared/consts/subject';

export default function Subject() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const currentSubject = subjects.find((subject) => subject.id === subjectId);

  if (!currentSubject) {
    navigate('/404');
    return null;
  }

  return <>{currentSubject.label}</>;
}
