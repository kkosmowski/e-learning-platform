import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';
import { SimpleClassroom } from 'shared/types/classroom';
import { getClassrooms } from 'api/group';

export default function ClassroomsManagement() {
  const [classrooms, setClassrooms] = useState<SimpleClassroom[]>([]);
  const { t } = useTranslation('settings', { keyPrefix: 'classrooms' });
  const navigate = useNavigate();

  const navigateToClassroomCreatePage = () => {
    navigate('./create');
  };

  const fetchClassrooms = async () => {
    const { data } = await getClassrooms();
    setClassrooms(data);
  };

  useEffect(() => {
    void fetchClassrooms();
  }, []);

  return (
    <>
      <ViewHeader title={t('title')} />

      <Centered innerSx={{ alignItems: 'flex-start', maxWidth: 800, gap: 3 }}>
        <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" onClick={navigateToClassroomCreatePage}>
            {t('addNew')}
          </Button>
        </Box>

        {classrooms.length ? (
          <List sx={{ width: '100%' }}>
            {classrooms.map((classroom) => (
              <ListItem
                key={classroom.id}
                divider
                secondaryAction={
                  <>
                    <IconButton
                      color="primary"
                      aria-label={t('common:edit')}
                      disabled // @todo temporary
                      // onClick={() => showEditClassroomForm(classroom)}
                    >
                      <EditIcon />
                    </IconButton>
                    {/*<IconButton*/}
                    {/*  color="error"*/}
                    {/*  aria-label={t('common:delete')}*/}
                    {/*  onClick={() => showConfirmationDialog(classroom)}*/}
                    {/*>*/}
                    {/*  <DeleteIcon />*/}
                    {/*</IconButton>*/}
                  </>
                }
                sx={{ py: 1.5 }}
              >
                {classroom.name}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>{t('noItems')}</Typography>
        )}
      </Centered>
    </>
  );
}
