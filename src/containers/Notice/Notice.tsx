import { useEffect } from 'react';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import NoticeCard from 'shared/components/NoticeCard';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useNoticeQuery } from 'shared/hooks/use-notice-query';
import { useAuth } from 'contexts/auth';
import PageLoading from 'shared/components/PageLoading';

export default function Notice() {
  const { navigate } = useCustomNavigate();
  const { noticeId } = useParams<{ noticeId: string }>();
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const { notice, isLoading, isSuccess, isError } = useNoticeQuery(
    currentUser,
    noticeId
  );

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
