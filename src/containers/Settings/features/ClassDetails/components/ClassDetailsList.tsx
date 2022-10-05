import { List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Class } from 'shared/types/class';
import ListGridItem from 'shared/components/ListGridItem';

interface ClassDetailsListProps {
  class: Class;
}

export default function ClassDetailsList(props: ClassDetailsListProps) {
  const { class: currentClass } = props;
  const { t } = useTranslation('settings', { keyPrefix: 'classes' });

  return (
    <List>
      <ListGridItem label={t('name')} value={currentClass.name} />

      <ListGridItem
        label={t('teacher')}
        value={currentClass.teacher.fullName}
      />

      <ListGridItem
        label={t('students')}
        value={
          <List disablePadding dense sx={{ flex: 2 }}>
            {currentClass.students.map((student) => (
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
