import { ListItemButton } from '@mui/material';

import { SimpleSubject } from 'shared/types/subject';

interface SubjectListItemButtonProps {
  subject: SimpleSubject;
  onNavigate: (subjectId: string) => void;
}

export default function SubjectListItemButton(
  props: SubjectListItemButtonProps
) {
  const { subject, onNavigate } = props;
  return (
    <ListItemButton key={subject.id} onClick={() => onNavigate(subject.id)}>
      {subject.name}
    </ListItemButton>
  );
}
