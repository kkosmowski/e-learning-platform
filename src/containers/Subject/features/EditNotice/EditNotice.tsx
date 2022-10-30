import { useMemo } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import SectionTitle from 'shared/components/SectionTitle';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useNoticeQuery } from 'shared/hooks/use-notice-query';
import EditNoticeForm from './components/EditNoticeForm';

export default function EditNotice() {
  const { subjectId, noticeId } = useParams();
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('notice');
  const { notice, update, isError } = useNoticeQuery(noticeId);
  if (!subjectId || !noticeId || isError) {
    navigate('/404');
  }

  const initialValues = useMemo(
    () =>
      notice && subjectId
        ? {
            subjectId: subjectId,
            name: notice.name,
            content: notice.content,
            publishInstantly: false,
            publishTime: notice.publishTime,
            isPublished: notice.publishTime.getTime() < new Date().getTime(),
          }
        : null,
    [notice, subjectId]
  );

  return (
    <>
      <SectionTitle>{t('edit.title')}</SectionTitle>

      <Card>
        <CardContent>
          {initialValues ? (
            <EditNoticeForm initialValues={initialValues} onSubmit={update} />
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
