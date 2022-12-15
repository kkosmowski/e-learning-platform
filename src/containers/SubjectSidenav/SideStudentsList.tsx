import { List, ListItemButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SubjectWithClass } from 'shared/types/subject';

interface SideStudentsListProps {
  subject: SubjectWithClass;
  onNavigate: (studentId: string) => void;
}

export default function SideStudentsList(props: SideStudentsListProps) {
  const { subject, onNavigate } = props;
  const { t } = useTranslation('sidenav');

  return (
    <>
      <Typography sx={{ fontWeight: 600 }}>{t('students')}</Typography>

      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        {subject.subjectClass.students.map((student) => (
          <ListItemButton
            key={student.id}
            onClick={() => onNavigate(student.id)}
          >
            {student.fullName}
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
