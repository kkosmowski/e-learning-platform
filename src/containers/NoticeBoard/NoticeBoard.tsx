import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

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
        <Grid container spacing={2}>
          {notices.map((notice) => (
            <Grid item key={notice.id} sm={12} lg={6}>
              <NoticeCard
                notice={notice}
                boardPreview
                onClick={() => navigateToNotice(notice.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : isLoading ? (
        <PageLoading />
      ) : (
        <Typography color="text.secondary">{t('common:noNotices')}</Typography>
      )}
    </Centered>
  );
}
