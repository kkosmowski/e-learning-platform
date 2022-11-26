import { List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ListGridItem from 'shared/components/ListGridItem';
import { SubjectWithClass } from 'shared/types/subject';

interface SubjectDetailsListProps {
  subject: SubjectWithClass;
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
        label={t('details.class')}
        value={subject.subjectClass.name}
        link={`/settings/classes/${subject.subjectClass.id}`}
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
            {subject.subjectClass.students.map((student) => (
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
