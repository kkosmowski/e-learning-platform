import { useParams, useNavigate } from 'react-router-dom';

import { Sidenav } from 'layouts/Application/components';
import { useSubjectQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import SideStudentsList from './SideStudentsList';

export default function SubjectSidenav() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { subject, isLoading, isSuccess } = useSubjectQuery(subjectId, {
    full: true,
  });

  const navigateToStudent = (studentId: string) => {
    navigate(`/subjects/${subjectId}/grades/${studentId}`);
  };

  return (
    <Sidenav>
      {isSuccess && subject ? (
        <SideStudentsList subject={subject} onNavigate={navigateToStudent} />
      ) : isLoading ? (
        <PageLoading />
      ) : null}
    </Sidenav>
  );
}
