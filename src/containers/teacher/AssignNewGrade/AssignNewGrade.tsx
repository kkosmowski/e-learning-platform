import { useMemo } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useGradeQuery } from 'shared/queries';
import { useGradeForm } from 'shared/hooks';
import SectionTitle from 'shared/components/SectionTitle';
import { CreateGradeForm, GradeType } from 'shared/types/grade';
import useCustomNavigate from 'hooks/use-custom-navigate';

interface AssignNewGradeProps {
  taskId?: string;
}

export default function AssignNewGrade(props: AssignNewGradeProps) {
  const { taskId } = props;
  const createGrade = useGradeQuery();
  const { back } = useCustomNavigate();
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
    back();
  };

  const { Form } = useGradeForm({
    initialValues,
    requireModifying: true,
    submitButtonLabel: t('grade:create.submit'),
    onSubmit: handleSubmit,
    onCancel: back,
    t,
  });

  return (
    <>
      <SectionTitle>{t('create.title')}</SectionTitle>

      <Card>
        <CardContent>{Form}</CardContent>
      </Card>
    </>
  );
}
