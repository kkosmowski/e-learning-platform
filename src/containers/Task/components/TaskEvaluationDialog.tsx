import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Info } from '@mui/icons-material';
import { Stack } from '@mui/material';

import Dialog from 'shared/components/Dialog';
import { useCreateGradeQuery } from 'shared/queries';
import { CreateGradeForm, GradeType } from 'shared/types/grade';
import { useGradeForm } from 'shared/hooks';
import { TaskEvaluationDialogData } from 'shared/types/task';
import { SECOND } from 'shared/consts/date';
import TextButton from 'shared/components/TextButton';
import { useLocalStorage } from 'shared/hooks';
import { assumedLowestValueToast } from 'shared/consts/shared';

interface TaskEvaluationDialogProps {
  open: boolean;
  data: TaskEvaluationDialogData | undefined;
  onClose: () => void;
}

export default function TaskEvaluationDialog(props: TaskEvaluationDialogProps) {
  const { open, data, onClose } = props;
  const createGrade = useCreateGradeQuery();
  const { get, set } = useLocalStorage(); // @todo if this case repeats, implement useHideToast (hide, isHidden)
  const { t } = useTranslation('grade');
  const assumedLowestValueToastRef = useRef<string | null>(null);

  useEffect(() => {
    toast.dismiss();
  }, []);

  const hideAssumedLowestValueToast = useCallback(() => {
    if (assumedLowestValueToastRef.current) {
      toast.dismiss(assumedLowestValueToastRef.current);
      assumedLowestValueToastRef.current = null;
    }
    set(assumedLowestValueToast, 1);
  }, [set]);

  useEffect(() => {
    if (data?.suggestedGrade && !get(assumedLowestValueToast)) {
      assumedLowestValueToastRef.current = toast(
        <Stack alignItems="flex-end">
          {t('toast.assumedLowestValue')}
          <TextButton onClick={hideAssumedLowestValueToast}>
            {t('common:dontShowThis')}
          </TextButton>
        </Stack>,
        { icon: <Info color="primary" />, duration: 10 * SECOND }
      );
    }
  }, [data?.suggestedGrade, get, hideAssumedLowestValueToast, t]);

  const initialValues: CreateGradeForm = useMemo(
    () => ({
      subjectId: data?.subjectId || '',
      studentId: data?.studentId || '',
      type: GradeType.ASSIGNMENT,
      taskId: data?.taskId || '',
      name: '',
      value: data?.suggestedGrade || 0,
    }),
    [data]
  );

  const handleSubmit = (form: CreateGradeForm) => {
    createGrade(form);
    requestIdleCallback(onClose);
  };

  const { Form } = useGradeForm({
    initialValues,
    requireModifying: false,
    hide: ['subjectId', 'type'],
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
