import { useMemo } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

import { useCreateGradeQuery } from 'shared/queries';
import { useGradeForm } from 'shared/hooks';
import SectionTitle from 'shared/components/SectionTitle';
import { CreateGradeForm, GradeType } from 'shared/types/grade';

interface AssignNewGradeProps {
  taskId?: string;
}

export default function AssignNewGrade(props: AssignNewGradeProps) {
  const { taskId } = props;
  const { subjectId } = useParams();
  const { handleCreate: createGrade } = useCreateGradeQuery();
  const navigate = useNavigate();
  const { t } = useTranslation('grade');

  const initialValues: CreateGradeForm = useMemo(
    () => ({
      subjectId: subjectId || '',
      studentId: '',
      type: GradeType.ASSIGNMENT,
      taskId: taskId || null,
      name: '',
      value: 0,
    }),
    [subjectId, taskId]
  );

  const handleSubmit = (form: CreateGradeForm) => {
    createGrade(form);
    requestIdleCallback(() => navigate('..'));
  };

  const { Form } = useGradeForm({
    initialValues,
    hide: ['subjectId'],
    requireModifying: true,
    submitButtonLabel: t('grade:create.submit'),
    onSubmit: handleSubmit,
    onCancel: () => navigate(-1),
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
