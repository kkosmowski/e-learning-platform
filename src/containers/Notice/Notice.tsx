import { useEffect } from 'react';
import { useParams } from 'react-router';

import { Centered } from 'shared/components/Container';
import NoticeCard from 'shared/components/NoticeCard';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useNoticeQuery } from 'shared/hooks/use-notice-query';
import { useAuth } from 'contexts/auth';
import PageLoading from '../../shared/components/PageLoading';

export default function Notice() {
  const { navigate } = useCustomNavigate();
  const { noticeId } = useParams<{ noticeId: string }>();
  const { currentUser } = useAuth();
  const { notice, isLoading, isSuccess } = useNoticeQuery(
    currentUser,
    noticeId
  );

  useEffect(() => {
    if (isSuccess && !notice) {
      navigate('/404');
    }
  }, [notice, isSuccess, navigate]);

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
