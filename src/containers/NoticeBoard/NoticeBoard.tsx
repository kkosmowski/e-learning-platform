import { Grid } from '@mui/material';

import Container from 'shared/components/Container';
import SectionTitle from 'shared/components/SectionTitle';
import NoticeCard from 'shared/components/NoticeCard';
import { notices } from 'shared/consts/notice';

export default function NoticeBoard() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <SectionTitle>Notice board</SectionTitle>

      <Grid container spacing={2}>
        {notices.map((notice) => (
          <Grid item key={notice.id} xs={12} md={6} lg={4}>
            <NoticeCard notice={notice} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
