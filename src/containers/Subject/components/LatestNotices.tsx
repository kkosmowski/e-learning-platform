import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import {
  LONGER_PREVIEW_CONTENT_RATIO,
  PREVIEW_CONTENT_RATIO,
  VISIBLE_LATEST_NOTICES,
} from 'shared/consts/notice';
import { isTeacher } from 'shared/utils/user.utils';
import SectionTitle from 'shared/components/SectionTitle';
import NoticeCard from 'shared/components/NoticeCard';
import TextButton from 'shared/components/TextButton';
import { useNoticesQuery } from 'shared/hooks/use-notices-query';
import { useAuth } from 'contexts/auth';
import PageLoading from 'shared/components/PageLoading';

interface LatestNoticesProps {
  onNoticeClick: (noticeId: string) => void;
  onMoreClick: () => void;
  onCreateNotice: () => void;
}

export default function LatestNotices(props: LatestNoticesProps) {
  const { onNoticeClick, onMoreClick, onCreateNotice } = props;
  const { subjectId } = useParams<{ subjectId: string }>();
  const { currentUser } = useAuth();
  const { notices, isSuccess, isLoading } = useNoticesQuery(
    currentUser,
    subjectId
  );
  const { t } = useTranslation('subject');

  return (
    <>
      <SectionTitle>
        <span>{t('general.latestNotices')}</span>

        {!!notices?.length && (
          <TextButton sx={{ ml: 2 }} onClick={onMoreClick}>
            {t('common:viewMore')}
          </TextButton>
        )}

        {isTeacher(currentUser) && (
          <TextButton sx={{ ml: 2 }} onClick={onCreateNotice}>
            {t('createNew.notice')}
          </TextButton>
        )}
      </SectionTitle>

      <NoticesBox
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            lg: `${LONGER_PREVIEW_CONTENT_RATIO}fr repeat(2, ${PREVIEW_CONTENT_RATIO}fr)`,
          },
        }}
      >
        {isSuccess && notices?.length ? (
          notices
            .slice(0, VISIBLE_LATEST_NOTICES)
            .map((notice, index) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                {...(index ? { preview: true } : { longerPreview: true })}
                onClick={() => onNoticeClick(notice.id)}
              />
            ))
        ) : isLoading ? (
          <PageLoading />
        ) : (
          <Typography color="text.secondary">
            {t('common:noNotices')}
          </Typography>
        )}
      </NoticesBox>
    </>
  );
}

const NoticesBox = styled(Box)(() => ({
  display: 'grid',
  gap: 16,
}));
