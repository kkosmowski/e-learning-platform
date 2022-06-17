import { Box, Button, styled, Typography } from '@mui/material';

import { Notice } from 'shared/types/notice';
import {
  LONGER_PREVIEW_CONTENT_RATIO,
  PREVIEW_CONTENT_RATIO,
  VISIBLE_LATEST_NOTICES,
} from 'shared/consts/notice';
import SectionTitle from 'shared/components/SectionTitle';
import NoticeCard from 'shared/components/NoticeCard';

interface LatestNoticesProps {
  notices: Notice[];
  onNoticeClick: (noticeId: string) => void;
  onMoreClick: () => void;
}

export default function LatestNotices(props: LatestNoticesProps) {
  const { notices, onNoticeClick, onMoreClick } = props;
  return (
    <>
      <SectionTitle>Latest notices</SectionTitle>

      <NoticesBox length={notices.length}>
        {notices.length ? (
          <>
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
          </>
        ) : (
          <Typography color="text.secondary">
            There are no notices yet.
          </Typography>
        )}
      </NoticesBox>
    </>
  );
}

const NoticesBox = styled(Box)(({ length }: { length: number }) => ({
  display: 'grid',
  gridTemplateColumns: generateGridTemplateColumns(length),
  gap: 16,
}));

const generateGridTemplateColumns = (length: number): string => {
  switch (length) {
    case 0:
      return '1fr';
    case 1:
      return `${LONGER_PREVIEW_CONTENT_RATIO}fr auto repeat(2, ${PREVIEW_CONTENT_RATIO}fr)`;
    case 2:
      return `${LONGER_PREVIEW_CONTENT_RATIO}fr ${PREVIEW_CONTENT_RATIO}fr auto ${PREVIEW_CONTENT_RATIO}fr`;
    default:
      return `${LONGER_PREVIEW_CONTENT_RATIO}fr repeat(2, ${PREVIEW_CONTENT_RATIO}fr) auto`;
  }
};
