import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from 'shared/components/Dialog';
import { useGradeQuery } from 'shared/queries';
import { CreateGradeForm, GradeType } from 'shared/types/grade';
import { useGradeForm } from 'shared/hooks';
import { TaskEvaluationDialogData } from 'shared/types/task';

interface TaskEvaluationDialogProps {
  open: boolean;
  data: TaskEvaluationDialogData | undefined;
  onClose: () => void;
}

export default function TaskEvaluationDialog(props: TaskEvaluationDialogProps) {
  const { open, data, onClose } = props;
  const createGrade = useGradeQuery();
  const { t } = useTranslation('grade');

  const initialValues: CreateGradeForm = useMemo(
    () => ({
      subjectId: data?.subjectId || '',
      studentId: data?.studentId || '',
      type: GradeType.ASSIGNMENT,
      taskId: data?.taskId || '',
      name: '',
      value: 0,
    }),
    [data]
  );

  const handleSubmit = (form: CreateGradeForm) => {
    createGrade(form);
    requestIdleCallback(onClose);
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
