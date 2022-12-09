import { useMemo } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useGradeQuery } from 'shared/queries';
import { useGradeForm } from 'shared/hooks';
import SectionTitle from 'shared/components/SectionTitle';
import { CreateGradeForm, GradeType } from 'shared/types/grade';

interface AssignNewGradeProps {
  taskId?: string;
}

export default function AssignNewGrade(props: AssignNewGradeProps) {
  const { taskId } = props;
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

  const { Form } = useGradeForm({
    initialValues,
    submitButtonLabel: t('grade:create.submit'),
    onSubmit: createGrade,
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
