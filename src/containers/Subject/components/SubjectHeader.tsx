import { Box, Divider, Typography } from '@mui/material';

import { background } from 'colors';
import Container from 'shared/components/Container';

interface SubjectHeaderProps {
  title: string;
}

export default function SubjectHeader(props: SubjectHeaderProps) {
  const { title } = props;

  return (
    <Box
      sx={{
        backgroundColor: background[50],
      }}
    >
      <Container>
        <Typography component="h2" variant="h2">
          {title}
        </Typography>
      </Container>
      <Divider />
    </Box>
  );
}
