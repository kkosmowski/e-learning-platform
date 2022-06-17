import { Box, Button, styled } from '@mui/material';

import { Notice } from 'shared/types/notice';
import {
  LONGER_PREVIEW_CONTENT_RATIO,
  PREVIEW_CONTENT_RATIO,
  VISIBLE_LATEST_NOTICES,
} from 'shared/consts/notice';
import NoticeCard from './NoticeCard';

interface LatestNoticesProps {
  notices: Notice[];
  onNoticeClick: (noticeId: string) => void;
  onMoreClick: () => void;
}

export default function LatestNotices(props: LatestNoticesProps) {
  const { notices, onNoticeClick, onMoreClick } = props;
  return (
    <NoticesBox>
      {notices.slice(0, VISIBLE_LATEST_NOTICES).map((notice, index) => (
        <NoticeCard
          key={notice.id}
          notice={notice}
          {...(index ? { preview: true } : { longerPreview: true })}
          onClick={() => onNoticeClick(notice.id)}
        />
      ))}

      <Button
        variant="contained"
        sx={{ flex: '0 0', whiteSpace: 'nowrap', alignSelf: 'center' }}
        onClick={onMoreClick}
      >
        View more
      </Button>
    </NoticesBox>
  );
}

const NoticesBox = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: `${LONGER_PREVIEW_CONTENT_RATIO}fr repeat(2, ${PREVIEW_CONTENT_RATIO}fr) auto`,
  gap: 16,
}));
