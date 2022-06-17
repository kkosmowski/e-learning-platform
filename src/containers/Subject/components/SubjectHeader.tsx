import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { background } from 'colors';
import Container from 'shared/components/Container';
import StyledLink from 'shared/components/StyledLink';
import TextButton from '../../../shared/components/TextButton';

interface SubjectHeaderProps {
  title: string;
}

export default function SubjectHeader(props: SubjectHeaderProps) {
  const { title } = props;
  const navigate = useNavigate();

  const navigateBack = (): void => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        backgroundColor: background[50],
      }}
    >
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography component="h2" variant="h2">
          {title}
        </Typography>

        <TextButton sx={{ ml: 2 }} onClick={navigateBack}>
          Back
        </TextButton>
      </Container>
      <Divider />
    </Box>
  );
}
