import { SyntheticEvent, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useNavigate, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';

export default function SettingsUsers() {
  const [tab, setTab] = useState('students');
  const navigate = useNavigate();
  const { t } = useTranslation('settings', { keyPrefix: 'users' });

  const handleTabChange = (event: SyntheticEvent, value: string) => {
    setTab(value);
  };

  useEffect(() => {
    navigate(tab);
  }, [navigate, tab]);

  return (
    <>
      <ViewHeader title={t('title')} />

      <Tabs value={tab} onChange={handleTabChange}>
        <Tab value="students" label={t('tabs.students')} />
        <Tab value="teachers" label={t('tabs.teachers')} />
        <Tab value="create" label={t('tabs.create')} />
      </Tabs>

      <Centered innerSx={{ marginLeft: 0 }}>
        <Outlet />
      </Centered>
    </>
  );
}
