import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, styled } from '@mui/material';

import { consts } from 'theme';
import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';
import StyledLink from 'shared/components/StyledLink';
import { categories } from './consts/categories';

export default function Settings() {
  const { t } = useTranslation('settings');

  return (
    <>
      <ViewHeader title={t('title')} />

      <Centered>
        <SettingsCategoriesContainer>
          {categories.map(({ label, Icon, route }) => (
            <SettingsCategoryCard key={route}>
              <StyledLink
                to={route}
                hoverUnderline={false}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <SettingsCategoryCardContent>
                  <Icon sx={{ fontSize: 36 }} />
                  {t(label)}
                </SettingsCategoryCardContent>
              </StyledLink>
            </SettingsCategoryCard>
          ))}
        </SettingsCategoriesContainer>
      </Centered>
    </>
  );
}

const cardsGap = 24;
const maxCardsInARow = 4;
const maxCardWidth =
  (consts.centeredLayoutMaxWidth - (maxCardsInARow - 1) * cardsGap) /
  maxCardsInARow;

const SettingsCategoriesContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: cardsGap,
}));

const SettingsCategoryCard = styled(Card)(() => ({
  minWidth: 120,
  maxWidth: maxCardWidth,
  height: 120,
  flex: '0 0 100%',
}));

const SettingsCategoryCardContent = styled(CardContent)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 4,
  textAlign: 'center',
  lineHeight: 1.2,
  '&&': {
    paddingLeft: 24,
    paddingRight: 24,
  },
}));
