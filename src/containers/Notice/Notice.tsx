import { useNavigate, useParams } from 'react-router';

import { Centered } from 'shared/components/Container';
import NoticeCard from 'shared/components/NoticeCard';
import { notices } from 'shared/consts/notice';
import { useEffect } from 'react';

export default function Notice() {
  const navigate = useNavigate();
  const { noticeId } = useParams<{ noticeId: string }>();
  const currentNotice = notices.find((notice) => notice.id === noticeId);

  useEffect(() => {
    if (!currentNotice) {
      navigate('/404');
    }
  }, [currentNotice, navigate]);

  if (!currentNotice) {
    return null;
  }

  return (
    <Centered>
      <NoticeCard notice={currentNotice} />
    </Centered>
  );
}
