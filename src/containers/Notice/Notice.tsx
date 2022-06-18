import Container from 'shared/components/Container';
import NoticeCard from 'shared/components/NoticeCard';
import { useNavigate, useParams } from 'react-router';
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
    <Container sx={{ flex: 1 }}>
      <NoticeCard notice={currentNotice} />
    </Container>
  );
}
