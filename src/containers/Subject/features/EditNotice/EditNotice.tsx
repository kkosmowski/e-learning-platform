import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SectionTitle from 'shared/components/SectionTitle';
import { useNoticeForm } from 'shared/hooks';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useNoticeQuery } from 'shared/hooks/use-notice-query';

export default function EditNotice() {
  const { subjectId } = useParams();
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('notice');
  const { update } = useNoticeQuery(subjectId);

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
    onSubmit: update,
    t,
  });

  return (
    <>
      <SectionTitle>{t('edit.title')}</SectionTitle>

      <Card>
        <CardContent>{Form}</CardContent>
      </Card>
    </>
  );
}
