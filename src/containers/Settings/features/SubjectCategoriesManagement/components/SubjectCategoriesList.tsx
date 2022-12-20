import { useEffect, useRef } from 'react';
import { Card, CardContent, IconButton, List, ListItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

import { SubjectCategory } from 'shared/types/subject';
import EditCategoryForm from './EditCategoryForm';
import { useSubjectCategoriesQuery } from 'shared/queries';

interface SubjectCategoriesListProps {
  categories: SubjectCategory[];
  isEditMode: (categoryId: string) => boolean;
  handleUpdate: (newName: string) => void;
  handleCancel: () => void;
  showEditCategoryForm: (category: SubjectCategory) => void;
  showConfirmationDialog: (category: SubjectCategory) => void;
}

export default function SubjectCategoriesList(
  props: SubjectCategoriesListProps
) {
  const { t } = useTranslation('settings', { keyPrefix: 'subjectCategories' });
  const loadMoreRef = useRef<HTMLLIElement | null>(null);
  const {
    categories,
    isEditMode,
    handleUpdate,
    handleCancel,
    showEditCategoryForm,
    showConfirmationDialog,
  } = props;
  const { isFetchingNextPage, hasNextCategoriesPage, fetchNextPage } =
    useSubjectCategoriesQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (
          entry?.isIntersecting &&
          !isFetchingNextPage &&
          hasNextCategoriesPage
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
  }, [isFetchingNextPage, hasNextCategoriesPage, fetchNextPage]);

  return (
    <Card>
      <CardContent>
        <List sx={{ width: '100%' }}>
          {categories.map((category, index) => (
            <ListItem
              key={category.id}
              divider={index !== categories.length - 1}
              secondaryAction={
                <>
                  <IconButton
                    color="primary"
                    aria-label={t('common:edit')}
                    onClick={() => showEditCategoryForm(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label={t('common:delete')}
                    onClick={() => showConfirmationDialog(category)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              sx={{
                py: isEditMode(category.id) ? 0.5 : 1.5,
                pr: 16,
              }}
            >
              {isEditMode(category.id) ? (
                <EditCategoryForm
                  value={category.name}
                  onSubmit={handleUpdate}
                  onCancel={handleCancel}
                />
              ) : (
                category.name
              )}
            </ListItem>
          ))}

          {hasNextCategoriesPage && <ListItem ref={loadMoreRef} />}
        </List>
      </CardContent>
    </Card>
  );
}
