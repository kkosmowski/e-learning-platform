import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import CommonViewLayout from 'layouts/CommonView';
import PageLoading from 'shared/components/PageLoading';
import SubjectsTable from './components/SubjectsTable';
import useSubjectsQuery from './hooks/use-subjects-query';
import { Paper, TableContainer } from '@mui/material';

export default function SubjectsManagement() {
  const { t } = useTranslation('settings', { keyPrefix: 'subjects' });
  const navigate = useNavigate();
  const { subjects, isLoading, isSuccess } = useSubjectsQuery();

  const handleSubjectClick = (subjectId: string) => {
    navigate(`./${subjectId}`);
  };

  const handleClassroomClick = (classroomId: string) => {
    navigate(`/settings/classrooms/${classroomId}`);
  };

  const handleTeacherClick = (userId: string) => {
    navigate(`/settings/user/${userId}`);
  };

  return (
    <CommonViewLayout
      headerTitle={t('title')}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      <TableContainer component={Paper}>
        {isLoading && <PageLoading />}
        {!isLoading && isSuccess ? (
          subjects?.length ? (
            <SubjectsTable
              subjects={subjects}
              onClick={handleSubjectClick}
              onClassroomClick={handleClassroomClick}
              onTeacherClick={handleTeacherClick}
            />
          ) : (
            t('noItems')
          )
        ) : null}
      </TableContainer>
    </CommonViewLayout>
  );
}
