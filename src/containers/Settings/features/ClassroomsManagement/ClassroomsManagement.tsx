import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import CommonViewLayout from 'layouts/CommonView';
import { SimpleClassroom } from 'shared/types/classroom';
import { getClassrooms } from 'api/classroom';

export default function ClassroomsManagement() {
  const [classrooms, setClassrooms] = useState<SimpleClassroom[]>([]);
  const { t } = useTranslation('settings', { keyPrefix: 'classrooms' });
  const navigate = useNavigate();

  const navigateToClassroomCreatePage = () => {
    navigate('create');
  };

  const navigateToClassroomEditPage = (
    classroomId: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    navigate(`${classroomId}/edit`);
  };

  const navigateToClassroomViewPage = (classroomId: string) => {
    navigate(`${classroomId}`);
  };

  const fetchClassrooms = async () => {
    const { data } = await getClassrooms();
    setClassrooms(data);
  };

  useEffect(() => {
    void fetchClassrooms();
  }, []);

  return (
    <CommonViewLayout headerTitle={t('title')} maxWidth={600}>
      <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" onClick={navigateToClassroomCreatePage}>
          {t('addNew')}
        </Button>
      </Box>

      {classrooms.length ? (
        <List sx={{ width: '100%' }}>
          {classrooms.map((classroom) => (
            <ListItemButton
              key={classroom.id}
              dense={true}
              divider
              sx={{ py: 1.5 }}
              onClick={() => navigateToClassroomViewPage(classroom.id)}
            >
              {classroom.name}
              <IconButton
                color="primary"
                size="small"
                sx={{ ml: 2 }}
                aria-label={t('common:edit')}
                onClick={(event) =>
                  navigateToClassroomEditPage(classroom.id, event)
                }
              >
                <EditIcon />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Typography>{t('noItems')}</Typography>
      )}
    </CommonViewLayout>
  );
}