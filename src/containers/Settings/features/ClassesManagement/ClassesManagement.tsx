import { MouseEvent, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
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
  const {
    classes: paginatedClasses,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    hasNextClassesPage,
    fetchNextPage,
  } = useClassesQuery();
  const loadMoreRef = useRef<HTMLLIElement | null>(null);
  const classes = useMemo(() => paginatedClasses?.flat(), [paginatedClasses]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (
          entry?.isIntersecting &&
          !isFetchingNextPage &&
          hasNextClassesPage
        ) {
          await fetchNextPage();
        }
      },
      {
        threshold: 1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextClassesPage, isFetchingNextPage]);

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

                <ListItem ref={loadMoreRef} />
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
