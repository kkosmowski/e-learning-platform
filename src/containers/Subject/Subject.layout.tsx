import { useParams, Outlet } from 'react-router';

import CommonViewLayout from 'layouts/CommonView';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useSubjectQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import SubjectSidenav from 'containers/SubjectSidenav';
import { LayoutFix } from 'layouts/LayoutFix';
import { useAuth } from 'contexts/auth';
import { isTeacher } from 'shared/utils/user.utils';
import HomeSidenav from 'containers/HomeSidenav';

export default function SubjectLayout() {
  const { navigate } = useCustomNavigate();
  const { currentUser } = useAuth();
  const { subjectId } = useParams<{ subjectId: string }>();
  const { simpleSubject, isLoading } = useSubjectQuery(subjectId, {
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
    <LayoutFix>
      {isTeacher(currentUser) ? <SubjectSidenav /> : <HomeSidenav />}

      <CommonViewLayout headerTitle={simpleSubject.name}>
        <Outlet />
      </CommonViewLayout>
    </LayoutFix>
  );
}
