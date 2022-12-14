import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grade } from 'shared/types/grade';
import { useCreateGradeQuery } from 'shared/queries';
import EditGradeDialog from 'shared/components/EditGradeDialog';

export function useEditGrade(grades: Grade[] | undefined, showOptions = true) {
  const [editedGrade, setEditedGrade] = useState<Grade | null>(null);
  const { handleUpdate: updateGrade } = useCreateGradeQuery();
  const { t } = useTranslation();

  const editGrade = useCallback(
    (gradeId: string) => {
      const gradeToEdit = grades?.find((grade) => grade.id === gradeId);

      if (gradeToEdit) {
        setEditedGrade(gradeToEdit);
      }
    },
    [grades]
  );

  const closeEditDialog = useCallback(() => {
    setEditedGrade(null);
  }, []);

  const handleGradeUpdate = useCallback(
    (value: number) => {
      if (editedGrade) {
        updateGrade({
          gradeId: editedGrade.id,
          studentId: editedGrade.user.id,
          value,
        });
      }
      closeEditDialog();
    },
    [closeEditDialog, editedGrade, updateGrade]
  );

  const options = useMemo(
    () =>
      showOptions
        ? [
            {
              label: t('common:edit'),
              onClick: editGrade,
            },
          ]
        : undefined,
    [editGrade, showOptions, t]
  );

  const Dialog = useMemo(
    () =>
      editedGrade ? (
        <EditGradeDialog
          grade={editedGrade}
          onSubmit={handleGradeUpdate}
          onCancel={closeEditDialog}
        />
      ) : null,
    [closeEditDialog, editedGrade, handleGradeUpdate]
  );

  return { options, editGrade, Dialog };
}
