import { useEffect } from 'react';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Centered } from 'shared/components/Container';
import { NoticeCard } from 'containers/Subject/components';
import { useNoticeQuery } from 'shared/queries/use-notice-query';
import PageLoading from 'shared/components/PageLoading';

export default function Notice() {
  const navigate = useNavigate();
  const { noticeId } = useParams<{ noticeId: string }>();
  const { t } = useTranslation();
  const { notice, isLoading, isSuccess, isError } = useNoticeQuery(noticeId);

  useEffect(() => {
    if (isError || (isSuccess && !notice)) {
      toast.error(t('error:NOTICE_NOT_FOUND'));
      navigate('/404');
    }
  }, [isError, isSuccess, notice, t, navigate]);

  return (
    <Centered>
      {isSuccess && notice ? (
        <NoticeCard notice={notice} />
      ) : isLoading ? (
        <PageLoading />
      ) : null}
    </Centered>
  );
}
