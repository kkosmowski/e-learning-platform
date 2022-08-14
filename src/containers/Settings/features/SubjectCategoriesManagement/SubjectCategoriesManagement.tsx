import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';
import CreateNewCategoryForm from './components/CreateNewCategoryForm';
import EditCategoryForm from './components/EditCategoryForm';

const fakeList = [
  { name: 'Math', id: 'mc3g342j' },
  { name: 'PE', id: 'k34ji5t' },
  { name: 'English', id: '13gonjmd' },
  { name: 'Physics', id: 'hg54prks' },
  { name: 'Biology', id: 'myo543ko' },
];

export default function SubjectCategoriesManagement() {
  const { t } = useTranslation('settings', { keyPrefix: 'subjectCategories' });
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState<string | null>(null);

  const isEditMode = (categoryId: string): boolean =>
    categoryId === editedCategory;

  const showCreateNewCategoryForm = () => {
    setIsCreateMode(true);
    setEditedCategory(null);
  };

  const showEditCategoryForm = (categoryId: string) => {
    setEditedCategory(categoryId);
    setIsCreateMode(false);
  };

  const handleCancel = () => {
    setIsCreateMode(false);
    setEditedCategory(null);
  };

  const handleCreateNew = () => {
    console.log('create');
  };

  const handleUpdate = (newName: string) => {
    console.log(
      fakeList.find(({ id }) => id === editedCategory)?.name,
      'was renamed to',
      newName
    );
  };

  const handleDelete = (categoryId: string) => {
    // @todo: confirmation dialog
    console.log(
      'delete category',
      fakeList.find(({ id }) => id === categoryId)?.name
    );
  };

  return (
    <>
      <ViewHeader title={t('title')} />

      <Centered innerSx={{ alignItems: 'flex-start', maxWidth: 600, gap: 3 }}>
        {isCreateMode ? (
          <CreateNewCategoryForm
            onSubmit={handleCreateNew}
            onCancel={handleCancel}
          />
        ) : (
          <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" onClick={showCreateNewCategoryForm}>
              {t('addNew')}
            </Button>
          </Box>
        )}

        <List sx={{ width: '100%' }}>
          {fakeList.map(({ id, name }) => (
            <ListItem
              key={id}
              divider
              secondaryAction={
                <>
                  <IconButton
                    color="primary"
                    aria-label={t('common:edit')}
                    onClick={() => showEditCategoryForm(id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label={t('common:delete')}
                    onClick={() => handleDelete(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              sx={{
                py: isEditMode(id) ? 0.5 : 1.5,
                pr: 16,
              }}
            >
              {isEditMode(id) ? (
                <EditCategoryForm
                  value={name}
                  onSubmit={handleUpdate}
                  onCancel={handleCancel}
                />
              ) : (
                name
              )}
            </ListItem>
          ))}
        </List>
      </Centered>
    </>
  );
}
