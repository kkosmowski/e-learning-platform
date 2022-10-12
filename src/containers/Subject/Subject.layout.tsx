import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router';

import Container from 'shared/components/Container';
import { subjects } from 'shared/consts/subject';
import ViewHeaderTitle from 'shared/components/ViewHeaderTitle';
import useCustomNavigate from 'hooks/use-custom-navigate';

export default function SubjectLayout() {
  const { navigate, back } = useCustomNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const currentSubject = subjects.find((subject) => subject.id === subjectId);

  useEffect(() => {
    if (!currentSubject) {
      navigate('/404');
    }
  }, [currentSubject, navigate]);

  if (!currentSubject) {
    return null;
  }

  return (
    <Container sx={{ p: 0, overflow: 'hidden', flex: 1 }}>
      <ViewHeaderTitle
        title={currentSubject.label}
        isLink
        linkTo={`/subjects/${currentSubject.id}`}
        onBack={() => back()}
      />
      <Outlet />
    </Container>
  );
}
