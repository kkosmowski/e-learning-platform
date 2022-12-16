import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import CommonViewLayout from 'layouts/CommonView';
import PageLoading from 'shared/components/PageLoading';
import { unknownError } from 'shared/consts/error';
import { useClassesQuery } from 'shared/queries';

export default function ClassesManagement() {
  const { t } = useTranslation('settings', { keyPrefix: 'classes' });
  const navigate = useNavigate();
  const { classes, isSuccess, isLoading } = useClassesQuery();

  const navigateToClassCreatePage = () => {
    navigate('create');
  };

  const navigateToClassEditPage = (
    classId: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    navigate(`${classId}/edit`);
  };

  const navigateToClassViewPage = (classId: string) => {
    navigate(`${classId}`);
  };

  return (
    <CommonViewLayout headerTitle={t('title')} maxWidth={600}>
      <Box sx={{ height: 40, display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" onClick={navigateToClassCreatePage}>
          {t('button.add')}
        </Button>
      </Box>

      {isSuccess ? (
        classes?.length ? (
          <Card>
            <CardContent>
              <List sx={{ width: '100%' }} disablePadding>
                {classes.map((currentClass, i) => (
                  <ListItemButton
                    key={currentClass.id}
                    dense={true}
                    divider={i !== classes.length - 1}
                    sx={{ py: 1.5 }}
                    onClick={() => navigateToClassViewPage(currentClass.id)}
                  >
                    {currentClass.name}
                    <IconButton
                      color="primary"
                      size="small"
                      sx={{ ml: 2 }}
                      aria-label={t('common:edit')}
                      onClick={(event) =>
                        navigateToClassEditPage(currentClass.id, event)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        ) : (
          <Typography>{t('noItems')}</Typography>
        )
      ) : isLoading ? (
        <PageLoading />
      ) : (
        t(unknownError)
      )}
    </CommonViewLayout>
  );
}
