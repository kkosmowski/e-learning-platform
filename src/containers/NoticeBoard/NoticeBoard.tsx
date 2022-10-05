import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import SectionTitle from 'shared/components/SectionTitle';
import NoticeCard from 'shared/components/NoticeCard';
import { notices } from 'shared/consts/notice';
import useCustomNavigate from 'hooks/use-custom-navigate';

export default function NoticeBoard() {
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('notice');

  const navigateToNotice = (noticeId: string): void => {
    navigate(noticeId);
  };

  return (
    <Centered>
      <SectionTitle>{t('noticeBoard')}</SectionTitle>

      {notices.length ? (
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
      ) : (
        <Typography color="text.secondary">{t('common:noNotices')}</Typography>
      )}
    </Centered>
  );
}
