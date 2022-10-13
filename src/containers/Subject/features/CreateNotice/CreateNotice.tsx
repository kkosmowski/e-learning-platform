import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SectionTitle from 'shared/components/SectionTitle';
import { useNoticeForm } from 'shared/hooks/use-notice-form';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { NoticeForm } from 'shared/types/notice';

export default function CreateNotice() {
  const { subjectId } = useParams();
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('notice');

  if (!subjectId) {
    navigate('/404');
  }

  const handleCreate = (form: NoticeForm) => {};

  const { Form } = useNoticeForm({
    initialValues: {
      subjectId: subjectId || '',
      name: '',
      content: '',
    },
    submitButtonLabel: t('common:create'),
    onSubmit: handleCreate,
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
