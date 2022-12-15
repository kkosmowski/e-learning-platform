import { List } from '@mui/material';

import SubjectListItemButton from './SubjectListItemButton';
import { SimpleSubject } from 'shared/types/subject';

interface SubjectListProps {
  subjects: SimpleSubject[];
  onNavigate: (subjectId: string) => void;
}

export default function SubjectList(props: SubjectListProps) {
  const { subjects, onNavigate } = props;

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {subjects.map((subject) => (
        <SubjectListItemButton
          key={subject.id}
          subject={subject}
          onNavigate={onNavigate}
        />
      ))}
    </List>
  );
}
