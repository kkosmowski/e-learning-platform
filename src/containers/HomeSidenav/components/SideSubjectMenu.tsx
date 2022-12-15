import { ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SimpleSubject } from 'shared/types/subject';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useGroupBySubject } from 'shared/hooks';
import { useAuth } from 'contexts/auth';
import { Role } from 'shared/types/user';
import SubjectList from './SubjectList';

interface SideSubjectMenuProps {
  subjects: SimpleSubject[];
}

export default function SideSubjectMenu(props: SideSubjectMenuProps) {
  const { subjects } = props;
  const { currentUser } = useAuth();
  const { navigate } = useCustomNavigate();
  const isTeacher = currentUser?.role === Role.Teacher;
  const { groupedSubjects } = useGroupBySubject(subjects, isTeacher);
  const { t } = useTranslation('sidenav');

  const navigateToSubject = (subjectId: string) => {
    navigate(`/subjects/${subjectId}`);
  };

  const renderSubjects = () => {
    if (isTeacher && groupedSubjects) {
      return groupedSubjects?.map((batch) => (
        <ListItem
          key={String(batch.label)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'stretch',
          }}
        >
          <span>{batch.label}</span>

          <SubjectList
            subjects={batch.subjects}
            onNavigate={navigateToSubject}
          />
        </ListItem>
      ));
    }

    return <SubjectList subjects={subjects} onNavigate={navigateToSubject} />;
  };

  return (
    <>
      <Typography sx={{ fontWeight: 600 }}>{t('subjects')}</Typography>

      {renderSubjects()}
    </>
  );
}
