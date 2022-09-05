import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';

import {
  createSubjectCategory,
  deleteSubjectCategory,
  getSubjectCategories,
  updateSubjectCategory,
} from 'api/subject';
import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';
import { getErrorDetail } from 'shared/utils/common.utils';
import { SubjectCategory } from 'shared/types/subject';
import { useConfirmationDialog } from 'shared/hooks';
import CreateNewCategoryForm from './components/CreateNewCategoryForm';
import EditCategoryForm from './components/EditCategoryForm';
import CommonViewLayout from 'layouts/CommonView';

export default function SubjectCategoriesManagement() {
  const { t } = useTranslation('settings', { keyPrefix: 'subjectCategories' });
  const [subjectCategories, setSubjectCategories] = useState<SubjectCategory[]>(
    []
  );
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState<SubjectCategory | null>(
    null
  );
  const { confirmAction, confirmationDialog } = useConfirmationDialog();

  const isEditMode = (categoryId: string): boolean =>
    categoryId === editedCategory?.id;

  const showCreateNewCategoryForm = () => {
    setIsCreateMode(true);
    setEditedCategory(null);
  };

  const showConfirmationDialog = async (category: SubjectCategory) => {
    const shouldDelete = await confirmAction({
      title: 'settings:subjectCategories.confirmDeleteTitle',
      message: {
        key: 'settings:subjectCategories.confirmDeleteMessage',
        props: { name: category.name },
      },
      confirmLabel: 'common:delete',
      confirmColor: 'error',
    });

    if (shouldDelete) {
      await handleDelete(category);
    }
  };

  const showEditCategoryForm = (category: SubjectCategory) => {
    setEditedCategory(category);
    setIsCreateMode(false);
  };

  const handleCancel = () => {
    setIsCreateMode(false);
    setEditedCategory(null);
  };

  const handleCreateNew = async (name: string) => {
    try {
      const { data } = await createSubjectCategory(name);
      setSubjectCategories([...subjectCategories, data]);
      toast.success(t('createSuccessToast', { name }));
    } catch (err: unknown) {
      const error = getErrorDetail(err);
      toast.error(t(error));
    }
  };

  const handleUpdate = async (newName: string) => {
    if (editedCategory) {
      try {
        const { data } = await updateSubjectCategory({
          id: editedCategory.id,
          name: newName,
        });
        setSubjectCategories(
          subjectCategories.map((category) =>
            category.id === data.id ? data : category
          )
        );
        toast.success(
          t('updateSuccessToast', { oldName: editedCategory.name, newName })
        );
      } catch (err: unknown) {
        const error = getErrorDetail(err);
        toast.error(t(error));
      }
    }
  };

  const handleDelete = async (category: SubjectCategory) => {
    try {
      await deleteSubjectCategory(category.id);
      toast.success(t('deleteSuccessToast', { name: category.name }));
      setSubjectCategories(
        subjectCategories.filter(({ id }) => category.id !== id)
      );
    } catch (err: unknown) {
      const error = getErrorDetail(err);
      toast.error(t(error));
    }
  };

  useEffect(() => {
    // @todo use TanStack Query
    (async () => {
      const { data } = await getSubjectCategories();
      setSubjectCategories(data);
    })();
  }, []);

  return (
    <CommonViewLayout
      headerTitle={t('title')}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
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
        {subjectCategories.map((category) => (
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

      {confirmationDialog}
    </CommonViewLayout>
  );
}
