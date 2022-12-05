import { useTranslation } from 'react-i18next';

import Dialog from 'shared/components/Dialog';
import AssignNewGrade from '../../teacher/AssignNewGrade';

interface TaskEvaluationDialogProps {
  open: boolean;
  taskId: string;
}

export default function TaskEvaluationDialog(props: TaskEvaluationDialogProps) {
  const { open, taskId } = props;
  const { t } = useTranslation('task');

  return (
    <Dialog
      title={t('submissions.evaluateDialog.title')}
      content={<AssignNewGrade taskId={taskId} />}
      open={open}
    />
  );
}
