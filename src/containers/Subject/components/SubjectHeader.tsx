import { Box, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { background } from 'colors';
import Container from 'shared/components/Container';
import TextButton from 'shared/components/TextButton';
import StyledLink from 'shared/components/StyledLink';

interface SubjectHeaderProps {
  subject: { id: string; label: string };
}

export default function SubjectHeader(props: SubjectHeaderProps) {
  const {
    subject: { id, label },
  } = props;
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  const navigateBack = (): void => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        backgroundColor: background[50],
      }}
    >
      <Container sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <StyledLink to={`/subjects/${id}`} sx={{ textDecoration: 'none' }}>
          <Typography component="h2" variant="h2" sx={{ color: 'inherit' }}>
            {label}
          </Typography>
        </StyledLink>

        <TextButton sx={{ ml: 2 }} onClick={navigateBack}>
          {t('back')}
        </TextButton>
      </Container>
      <Divider />
    </Box>
  );
}
