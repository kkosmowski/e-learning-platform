import { useParams, Outlet } from 'react-router';

import CommonViewLayout from 'layouts/CommonView';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useSubjectQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import { useAuth } from 'contexts/auth';

export default function SubjectLayout() {
  const { navigate, back } = useCustomNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const { currentUser } = useAuth();
  const { simpleSubject, isLoading } = useSubjectQuery(subjectId, currentUser, {
    simple: true,
  });

  if (!simpleSubject) {
    if (isLoading) {
      return <PageLoading />;
    }
    navigate('/404');
    return null;
  }

  return (
    <CommonViewLayout headerTitle={simpleSubject.name}>
      <Outlet />
    </CommonViewLayout>
  );
}
