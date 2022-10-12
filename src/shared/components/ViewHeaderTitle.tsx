import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import TextButton from 'shared/components/TextButton';
import StyledLink from 'shared/components/StyledLink';
import ViewHeader from './ViewHeader';

interface ViewHeaderProps {
  title: ReactNode;
  isLink?: boolean;
  linkTo?: string;
  onBack: () => void;
}

export default function ViewHeaderTitle(props: ViewHeaderProps) {
  const { title, isLink, linkTo, onBack } = props;
  const { t } = useTranslation('common');

  return (
    <ViewHeader>
      {isLink && linkTo ? (
        <StyledLink to={linkTo} sx={{ textDecoration: 'none' }}>
          <Typography component="h2" variant="h2" sx={{ color: 'inherit' }}>
            {title}
          </Typography>
        </StyledLink>
      ) : (
        <Typography component="h2" variant="h2" sx={{ color: 'inherit' }}>
          {title}
        </Typography>
      )}

      <TextButton sx={{ ml: 2 }} onClick={onBack}>
        {t('back')}
      </TextButton>
    </ViewHeader>
  );
}
