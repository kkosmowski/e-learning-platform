import { useTranslation } from 'react-i18next';
import { Box, Card, CardActionArea, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { consts } from 'theme';
import CommonViewLayout from 'layouts/CommonView';
import { categories } from './consts/categories';

export default function Settings() {
  const { t } = useTranslation('settings');
  const navigate = useNavigate();

  return (
    <CommonViewLayout headerTitle={t('title')}>
      <SettingsCategoriesContainer>
        {categories.map(({ label, Icon, route }) => (
          <SettingsCategoryCard key={route} onClick={() => navigate(route)}>
            <SettingsCategoryCardContent>
              <Icon color="primary" sx={{ fontSize: 28 }} />
              {t(label)}
            </SettingsCategoryCardContent>
          </SettingsCategoryCard>
        ))}
      </SettingsCategoriesContainer>
    </CommonViewLayout>
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
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const SettingsCategoryCardContent = styled(CardActionArea)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 15,
  rowGap: 4,
  textAlign: 'center',
  lineHeight: 1.2,
  '&&': {
    paddingLeft: 24,
    paddingRight: 24,
  },
}));
