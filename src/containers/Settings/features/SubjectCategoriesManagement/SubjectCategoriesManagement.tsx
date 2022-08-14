import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';
import CreateNewCategoryForm from './components/CreateNewCategoryForm';
import EditCategoryForm from './components/EditCategoryForm';
import toast from 'react-hot-toast';
import { getErrorDetail } from '../../../../shared/utils/common.utils';
import { SubjectCategory } from 'shared/types/subject';

const fakeList: SubjectCategory[] = [
  { name: 'Math', id: 'mc3g342j' },
  { name: 'PE', id: 'k34ji5t' },
  { name: 'English', id: '13gonjmd' },
  { name: 'Physics', id: 'hg54prks' },
  { name: 'Biology', id: 'myo543ko' },
];

export default function SubjectCategoriesManagement() {
  const { t } = useTranslation('settings', { keyPrefix: 'subjectCategories' });
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState<SubjectCategory | null>(
    null
  );

  const isEditMode = (categoryId: string): boolean =>
    categoryId === editedCategory?.id;

  const showCreateNewCategoryForm = () => {
    setIsCreateMode(true);
    setEditedCategory(null);
  };

  const showEditCategoryForm = (category: SubjectCategory) => {
    setEditedCategory(category);
    setIsCreateMode(false);
  };

  const handleCancel = () => {
    setIsCreateMode(false);
    setEditedCategory(null);
  };

  const handleCreateNew = (name: string) => {
    try {
      // @todo call backend
      toast.success(t('createSuccessToast', { name }));
    } catch (err: unknown) {
      const error = getErrorDetail(err);
      toast.error(t(error));
    }
  };

  const handleUpdate = (newName: string) => {
    if (editedCategory) {
      try {
        // @todo call backend
        toast.success(
          t('updateSuccessToast', { oldName: editedCategory.name, newName })
        );
      } catch (err: unknown) {
        const error = getErrorDetail(err);
        toast.error(t(error));
      }
    }
  };

  const handleDelete = (category: SubjectCategory) => {
    // @todo: confirmation dialog
    try {
      // @todo call backend
      toast.success(t('deleteSuccessToast', { name: category.name }));
    } catch (err: unknown) {
      const error = getErrorDetail(err);
      toast.error(t(error));
    }
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
          {fakeList.map((category) => (
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
                    onClick={() => handleDelete(category)}
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
      </Centered>
    </>
  );
}
