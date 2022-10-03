import { List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ListGridItem from 'shared/components/ListGridItem';
import { FullSubject } from 'shared/types/subject';

interface SubjectDetailsListProps {
  subject: FullSubject;
}

export default function SubjectDetailsList(props: SubjectDetailsListProps) {
  const { subject } = props;
  const { t } = useTranslation('settings', { keyPrefix: 'subjects' });

  return (
    <List>
      <ListGridItem
        label={t('details.category')}
        value={subject.category.name}
      />
      <ListGridItem
        label={t('details.classroom')}
        value={subject.classroom.name}
        link={`/settings/classrooms/${subject.classroom.id}`}
      />

      <ListGridItem
        label={t('details.teacher')}
        value={subject.teacher.fullName}
        link={`/settings/user/${subject.teacher.id}`}
      />

      <ListGridItem
        label={t('details.students')}
        value={
          <List disablePadding dense sx={{ flex: 2 }}>
            {subject.classroom.students.map((student) => (
              <ListItem key={student.id} disableGutters>
                {student.fullName}
              </ListItem>
            ))}
          </List>
        }
      />
    </List>
  );
}
