import { useEffect } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router';

import Container from 'shared/components/Container';
import { subjects } from 'shared/consts/subject';
import ViewHeader from 'layouts/Application/components/ViewHeader';

export default function SubjectLayout() {
  const navigate = useNavigate();
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

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ p: 0, overflow: 'hidden', flex: 1 }}>
      <ViewHeader
        title={currentSubject.label}
        isLink
        linkTo={`/subjects/${currentSubject.id}`}
        onBack={navigateBack}
      />
      <Outlet />
    </Container>
  );
}
