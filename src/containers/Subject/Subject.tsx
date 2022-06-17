import { useNavigate } from 'react-router';

import Container from 'shared/components/Container';
import { notices } from 'shared/consts/notice';
import LatestNotices from './components/LatestNotices';

export default function Subject() {
  const navigate = useNavigate();

  const navigateToNotices = (): void => {
    navigate('notices');
  };

  const navigateToNotice = (noticeId: string): void => {
    navigate(`notices/${noticeId}`);
  };

  return (
    <Container>
      <LatestNotices
        notices={notices}
        onNoticeClick={navigateToNotice}
        onMoreClick={navigateToNotices}
      />
    </Container>
  );
}
