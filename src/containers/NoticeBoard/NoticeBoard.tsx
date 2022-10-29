import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Masonry } from '@mui/lab';

import { Centered } from 'shared/components/Container';
import SectionTitle from 'shared/components/SectionTitle';
import NoticeCard from 'shared/components/NoticeCard';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useNoticesQuery } from 'shared/hooks/use-notices-query';
import { useAuth } from 'contexts/auth';
import PageLoading from 'shared/components/PageLoading';

export default function NoticeBoard() {
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('notice');
  const { subjectId } = useParams<{ subjectId: string }>();
  const { currentUser } = useAuth();
  const { notices, isSuccess, isLoading } = useNoticesQuery(
    currentUser,
    subjectId
  );

  const navigateToNotice = (noticeId: string): void => {
    navigate(noticeId);
  };

  return (
    <Centered>
      <SectionTitle>{t('title')}</SectionTitle>

      {isSuccess && notices?.length ? (
        <Masonry columns={{ sm: 1, md: 2 }} spacing={2}>
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              boardPreview
              onClick={() => navigateToNotice(notice.id)}
            />
          ))}
        </Masonry>
      ) : isLoading ? (
        <PageLoading />
      ) : (
        <Typography color="text.secondary">{t('common:noNotices')}</Typography>
      )}
    </Centered>
  );
}
