import { Grid } from '@mui/material';

import Container from 'shared/components/Container';
import SectionTitle from 'shared/components/SectionTitle';
import NoticeCard from 'shared/components/NoticeCard';
import { notices } from 'shared/consts/notice';
import { useNavigate } from 'react-router';

export default function NoticeBoard() {
  const navigate = useNavigate();

  const navigateToNotice = (noticeId: string): void => {
    navigate(noticeId);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <SectionTitle>Notice board</SectionTitle>

      <Grid container spacing={2}>
        {notices.map((notice) => (
          <Grid item key={notice.id} xs={12} md={6} lg={4}>
            <NoticeCard
              notice={notice}
              boardPreview
              onClick={() => navigateToNotice(notice.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
