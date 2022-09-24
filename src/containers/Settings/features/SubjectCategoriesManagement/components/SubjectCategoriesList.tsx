import { IconButton, List, ListItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

import { SubjectCategory } from 'shared/types/subject';
import EditCategoryForm from './EditCategoryForm';

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
  const {
    categories,
    isEditMode,
    handleUpdate,
    handleCancel,
    showEditCategoryForm,
    showConfirmationDialog,
  } = props;

  return (
    <List sx={{ width: '100%' }}>
      {categories.map((category) => (
        <ListItem
          key={category.id}
          divider
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
    </List>
  );
}
