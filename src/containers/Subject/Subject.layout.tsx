import { useParams, Outlet } from 'react-router';

import Container from 'shared/components/Container';
import ViewHeaderTitle from 'shared/components/ViewHeaderTitle';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useSubjectQuery } from 'shared/hooks';
import PageLoading from 'shared/components/PageLoading';
import { useAuth } from 'contexts/auth';

export default function SubjectLayout() {
  const { navigate, back } = useCustomNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const { currentUser } = useAuth();
  const { currentSubject, isLoading } = useSubjectQuery(subjectId, currentUser);

  if (!currentSubject) {
    if (isLoading) {
      return <PageLoading />;
    }
    navigate('/404');
    return null;
  }

  return (
    <Container sx={{ p: 0, overflow: 'hidden', flex: 1 }}>
      <ViewHeaderTitle
        title={currentSubject.name}
        isLink
        linkTo={`/subjects/${currentSubject.id}`}
        onBack={() => back()}
      />
      <Outlet />
    </Container>
  );
}
