import { Divider, Typography } from '@mui/material';

import { background } from 'colors';
import { Centered } from 'shared/components/Container';
import TextButton from 'shared/components/TextButton';
import { useTranslation } from 'react-i18next';
import StyledLink from 'shared/components/StyledLink';
import { ReactNode } from 'react';

interface ViewHeaderProps {
  title: ReactNode;
  isLink?: boolean;
  linkTo?: string;
  onBack: () => void;
}

export default function ViewHeader(props: ViewHeaderProps) {
  const { title, isLink, linkTo, onBack } = props;
  const { t } = useTranslation('common');

  //@todo add Back button option
  return (
    <>
      <Centered
        sx={{ flexShrink: 0, backgroundColor: background[50] }}
        innerSx={{ flexDirection: 'row' }}
      >
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
      </Centered>

      <Divider />
    </>
  );
}
