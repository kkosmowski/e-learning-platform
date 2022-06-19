import { useNavigate, useParams, Outlet } from 'react-router';

import Container from 'shared/components/Container';
import { subjects } from 'shared/consts/subject';
import SubjectHeader from './components/SubjectHeader';

export default function Subject() {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const currentSubject = subjects.find((subject) => subject.id === subjectId);

  if (!currentSubject) {
    navigate('/404');
    return null;
  }

  return (
    <Container sx={{ p: 0, overflow: 'hidden', flex: 1 }}>
      <SubjectHeader subject={currentSubject} />
      <Outlet />
    </Container>
  );
}