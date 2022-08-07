import { SyntheticEvent, useEffect, useState } from 'react';
import { Tab, Tabs, Typography } from '@mui/material';
import { useNavigate, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';

export default function Settings() {
  const [tab, setTab] = useState('users/students');
  const navigate = useNavigate();
  const { t } = useTranslation('settings');

  const handleTabChange = (event: SyntheticEvent, value: string) => {
    setTab(value);
  };

  useEffect(() => {
    navigate(tab);
  }, [navigate, tab]);

  return (
    <>
      <Typography component="h2" variant="h2">
        {t('title')}
      </Typography>

      <Tabs value={tab} onChange={handleTabChange}>
        <Tab value="users/students" label={t('tabs.students')} />
        <Tab value="users/teachers" label={t('tabs.teachers')} />
        <Tab value="users/create" label={t('tabs.create')} />
      </Tabs>

      <Centered innerSx={{ marginLeft: 0 }}>
        <Outlet />
      </Centered>
    </>
  );
}
