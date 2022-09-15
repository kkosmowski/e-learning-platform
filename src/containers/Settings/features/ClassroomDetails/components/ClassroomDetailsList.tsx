import { List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Classroom } from 'shared/types/classroom';
import ListGridItem from 'shared/components/ListGridItem';

interface ClassroomDetailsListProps {
  classroom: Classroom;
}

export default function ClassroomDetailsList(props: ClassroomDetailsListProps) {
  const { classroom } = props;
  const { t } = useTranslation('settings', { keyPrefix: 'classrooms' });

  return (
    <List>
      <ListGridItem label={t('name')} value={classroom.name} />

      <ListGridItem label={t('teacher')} value={classroom.teacher.fullName} />

      <ListGridItem
        label={t('students')}
        value={
          <List disablePadding dense sx={{ flex: 2 }}>
            {classroom.students.map((student) => (
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
