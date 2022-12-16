import { SyntheticEvent, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { Outlet, useLocation, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import CommonViewLayout from 'layouts/CommonView';

export default function UsersManagement() {
  const { type } = useParams();
  const location = useLocation();
  const [tab, setTab] = useState(
    location.pathname.endsWith('create') ? 'create' : type || 'students'
  );
  const navigate = useNavigate();
  const { t } = useTranslation('settings', { keyPrefix: 'users' });

  const handleTabChange = (event: SyntheticEvent, value: string) => {
    setTab(value);
  };

  useEffect(() => {
    navigate(tab, { replace: true });
  }, [navigate, tab]);

  return (
    <CommonViewLayout
      headerTitle={t('title')}
      CenteredProps={{
        sx: { pt: 0 },
      }}
    >
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab value="students" label={t('tabs.students')} />
        <Tab value="teachers" label={t('tabs.teachers')} />
        <Tab value="create" label={t('tabs.create')} />
      </Tabs>

      <Outlet />
    </CommonViewLayout>
  );
}
