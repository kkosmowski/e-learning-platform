import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import SectionTitle from 'shared/components/SectionTitle';
import { useNoticeForm } from 'shared/hooks';
import { useCreateNoticeQuery } from 'shared/queries';

export default function CreateNotice() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('notice');
  const createNotice = useCreateNoticeQuery();

  if (!subjectId) {
    navigate('/404');
  }

  const { Form } = useNoticeForm({
    initialValues: {
      subjectId: subjectId || '',
      name: '',
      content: '',
      publishInstantly: true,
      publishTime: null,
    },
    submitButtonLabel: t('common:create'),
    onSubmit: createNotice,
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
