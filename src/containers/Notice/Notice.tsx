import { useNavigate, useParams } from 'react-router';

import Container, { Centered } from 'shared/components/Container';
import NoticeCard from 'shared/components/NoticeCard';
import { notices } from 'shared/consts/notice';

export default function Notice() {
  const navigate = useNavigate();
  const { noticeId } = useParams<{ noticeId: string }>();
  const currentNotice = notices.find((notice) => notice.id === noticeId);

  if (!currentNotice) {
    navigate('/404');
    return null;
  }

  return (
    <Centered>
      <NoticeCard notice={currentNotice} />
    </Centered>
  );
}
