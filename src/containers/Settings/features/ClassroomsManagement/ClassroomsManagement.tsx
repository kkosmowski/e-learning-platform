import { MouseEvent } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import CommonViewLayout from 'layouts/CommonView';
import { GetClassroomsResponse, SimpleClassroom } from 'shared/types/classroom';
import { getClassrooms } from 'api/classroom';
import PageLoading from 'shared/components/PageLoading';

export default function ClassroomsManagement() {
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

  const {
    data: classrooms,
    isSuccess,
    isLoading,
  } = useQuery<GetClassroomsResponse, AxiosError, SimpleClassroom[]>(
    ['classrooms'],
    getClassrooms,
    {
      select: ({ data }) => data,
    }
  );

  return (
    <CommonViewLayout headerTitle={t('title')} maxWidth={600}>
      <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" onClick={navigateToClassroomCreatePage}>
          {t('addNew')}
        </Button>
      </Box>

      {/*{ isSuccess ?*/}
      {/*  classrooms.length ? (*/}
      {/*    <List sx={ { width: '100%' } }>*/}
      {/*      { classrooms.map((classroom) => (*/}
      {/*        <ListItemButton*/}
      {/*          key={ classroom.id }*/}
      {/*          dense={ true }*/}
      {/*          divider*/}
      {/*          sx={ { py: 1.5 } }*/}
      {/*          onClick={ () => navigateToClassroomViewPage(classroom.id) }*/}
      {/*        >*/}
      {/*          { classroom.name }*/}
      {/*          <IconButton*/}
      {/*            color="primary"*/}
      {/*            size="small"*/}
      {/*            sx={ { ml: 2 } }*/}
      {/*            aria-label={ t('common:edit') }*/}
      {/*            onClick={ (event) =>*/}
      {/*              navigateToClassroomEditPage(classroom.id, event)*/}
      {/*            }*/}
      {/*          >*/}
      {/*            <EditIcon />*/}
      {/*          </IconButton>*/}
      {/*        </ListItemButton>*/}
      {/*      )) }*/}
      {/*    </List>*/}
      {/*  ) : (*/}
      {/*    <Typography>{ t('noItems') }</Typography>*/}
      {/*  ) : isLoading*/}
      {/*    ? (*/}
      {/*    ) : (*/}
      {/*      'error'*/}
      {/*    )*/}
      {/*}*/}

      <PageLoading />
    </CommonViewLayout>
  );
}
