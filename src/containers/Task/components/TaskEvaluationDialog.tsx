import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from 'shared/components/Dialog';
import { useGradeQuery } from 'shared/queries';
import { CreateGradeForm, GradeType } from 'shared/types/grade';
import { useGradeForm } from 'shared/hooks';

interface TaskEvaluationDialogProps {
  open: boolean;
  taskId: string;
  onClose: () => void;
}

export default function TaskEvaluationDialog(props: TaskEvaluationDialogProps) {
  const { open, taskId, onClose } = props;
  const createGrade = useGradeQuery();
  const { t } = useTranslation('grade');

  const initialValues: CreateGradeForm = useMemo(
    () => ({
      subjectId: '',
      studentId: '',
      type: GradeType.ASSIGNMENT,
      taskId: taskId || null,
      name: '',
      value: 0,
    }),
    [taskId]
  );

  const handleSubmit = (form: CreateGradeForm) => {
    createGrade(form);
    onClose();
  };

  const { Form } = useGradeForm({
    initialValues,
    submitButtonLabel: t('create.submit'),
    onSubmit: handleSubmit,
    onCancel: onClose,
    t,
  });

  return (
    <Dialog
      title={t('task:submissions.evaluateDialog.title')}
      content={Form}
      open={open}
      sx={{
        '.MuiPaper-root.MuiDialog-paper': {
          width: 'min(700px, 80%)',
          minWidth: 400,
          maxWidth: 'unset',
        },
      }}
    />
  );
}
