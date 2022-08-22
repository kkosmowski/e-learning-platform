import { Box, List, ListItem, styled, Typography } from '@mui/material';

import { Classroom } from 'shared/types/classroom';
import { useTranslation } from 'react-i18next';

interface ClassroomDetailsListProps {
  classroom: Classroom;
}

export default function ClassroomDetailsList(props: ClassroomDetailsListProps) {
  const { classroom } = props;
  const { t } = useTranslation('settings', { keyPrefix: 'classrooms' });

  return (
    <List>
      {/* todo: extract to a single component */}
      <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <ListItemWrapper>
          <Typography sx={{ flex: 1 }}>{t('name')}</Typography>
          <Typography sx={{ flex: 2 }}>{classroom.name}</Typography>
        </ListItemWrapper>
      </ListItem>

      <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <ListItemWrapper>
          <Typography sx={{ flex: 1 }}>{t('teacher')}</Typography>
          <Typography sx={{ flex: 2 }}>{classroom.teacher.fullName}</Typography>
        </ListItemWrapper>
      </ListItem>

      <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <ListItemWrapper>
          <Typography sx={{ flex: 1 }}>{t('students')}</Typography>

          <List disablePadding dense sx={{ flex: 2 }}>
            {classroom.students.map((student) => (
              <ListItem key={student.id} disableGutters>
                {student.fullName}
              </ListItem>
            ))}
          </List>
        </ListItemWrapper>
      </ListItem>
    </List>
  );
}

const ListItemWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'stretch',
  columnGap: 16,
}));
