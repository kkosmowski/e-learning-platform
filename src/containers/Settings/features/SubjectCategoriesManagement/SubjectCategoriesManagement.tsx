import { useCallback, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';

import { SubjectCategory } from 'shared/types/subject';
import { useConfirmationDialog } from 'shared/hooks';
import { useSubjectCategoriesQuery } from 'shared/queries';
import CreateNewCategoryForm from './components/CreateNewCategoryForm';
import CommonViewLayout from 'layouts/CommonView';
import PageLoading from 'shared/components/PageLoading';
import SubjectCategoriesList from './components/SubjectCategoriesList';
import colors from 'colors';

export default function SubjectCategoriesManagement() {
  const { t } = useTranslation('settings', { keyPrefix: 'subjectCategories' });
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState<SubjectCategory | null>(
    null
  );
  const { confirmAction, confirmationDialog } = useConfirmationDialog();
  const {
    subjectCategories,
    isLoading,
    isSuccess,
    createSubjectCategory,
    updateSubjectCategory,
    deleteSubjectCategory,
  } = useSubjectCategoriesQuery();

  const isEditMode = useCallback(
    (categoryId: string): boolean => categoryId === editedCategory?.id,
    [editedCategory]
  );

  const showCreateNewCategoryForm = () => {
    setIsCreateMode(true);
    setEditedCategory(null);
  };

  const showConfirmationDialog = useCallback(
    async (category: SubjectCategory) => {
      const shouldDelete = await confirmAction({
        title: 'settings:subjectCategories.confirm.deleteTitle',
        message: (
          <Trans
            i18nKey="settings:subjectCategories.confirm.deleteMessage"
            values={{ name: category.name }}
          >
            <strong style={{ color: colors.text.primary }} />
          </Trans>
        ),
        confirmLabel: 'common:delete',
        confirmColor: 'error',
      });

      if (shouldDelete) {
        await deleteSubjectCategory(category.id);
      }
    },
    [confirmAction, deleteSubjectCategory]
  );

  const showEditCategoryForm = useCallback((category: SubjectCategory) => {
    setEditedCategory(category);
    setIsCreateMode(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsCreateMode(false);
    setEditedCategory(null);
  }, []);

  const handleUpdate = useCallback(
    (newName: string) => {
      if (editedCategory) {
        updateSubjectCategory({
          id: editedCategory.id,
          name: newName,
        });
      }
    },
    [editedCategory, updateSubjectCategory]
  );

  const listProps = useMemo(
    () => ({
      isEditMode,
      handleUpdate,
      handleCancel,
      showEditCategoryForm,
      showConfirmationDialog,
    }),
    [
      showEditCategoryForm,
      showConfirmationDialog,
      isEditMode,
      handleUpdate,
      handleCancel,
    ]
  );

  return (
    <CommonViewLayout
      headerTitle={t('title')}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      {isCreateMode ? (
        <CreateNewCategoryForm
          onSubmit={createSubjectCategory}
          onCancel={handleCancel}
        />
      ) : (
        <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" onClick={showCreateNewCategoryForm}>
            {t('button.add')}
          </Button>
        </Box>
      )}

      {isLoading && <PageLoading />}

      {isSuccess && !subjectCategories?.length && t('noItems')}

      {isSuccess && !!subjectCategories?.length && (
        <SubjectCategoriesList categories={subjectCategories} {...listProps} />
      )}

      {confirmationDialog}
    </CommonViewLayout>
  );
}
