import { useTranslation } from 'react-i18next';
import { Box, Button, Paper, TableContainer } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import PageLoading from 'shared/components/PageLoading';
import SubjectsTable from './components/SubjectsTable';
import { useSubjectsQuery } from 'shared/queries';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useAuth } from 'contexts/auth';

export default function SubjectsManagement() {
  const { t } = useTranslation('settings');
  const { navigate } = useCustomNavigate();
  const { currentUser } = useAuth();
  const { fullSubjects, isLoading, isSuccess } = useSubjectsQuery({
    full: true,
  });

  const handleSubjectClick = (subjectId: string) => {
    navigate(`./${subjectId}`);
  };

  const handleClassClick = (classId: string) => {
    navigate(`/settings/classes/${classId}`);
  };

  const handleTeacherClick = (userId: string) => {
    navigate(`/settings/user/${userId}`);
  };

  const navigateToSubjectCreatePage = () => {
    navigate('./create');
  };

  return (
    <CommonViewLayout
      headerTitle={t('title')}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" onClick={navigateToSubjectCreatePage}>
          {t('subjects.button.add')}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        {isLoading && <PageLoading />}
        {!isLoading && isSuccess ? (
          fullSubjects?.length ? (
            <SubjectsTable
              subjects={fullSubjects}
              onClick={handleSubjectClick}
              onClassClick={handleClassClick}
              onTeacherClick={handleTeacherClick}
            />
          ) : (
            t('subjects.noItems')
          )
        ) : null}
      </TableContainer>
    </CommonViewLayout>
  );
}
