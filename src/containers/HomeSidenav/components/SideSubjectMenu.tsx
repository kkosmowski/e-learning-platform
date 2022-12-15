import { ListItem, Typography } from '@mui/material';

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
      <Typography>Przejdź do przedmiotu</Typography>

      {renderSubjects()}
    </>
  );
}
