import { SyntheticEvent, useEffect, useState } from 'react';
import { Tab, Tabs, Typography } from '@mui/material';

import { Centered } from 'shared/components/Container';
import { useNavigate, Outlet } from 'react-router';

export default function Settings() {
  const [tab, setTab] = useState('users/students');
  const navigate = useNavigate();

  const handleTabChange = (event: SyntheticEvent, value: string) => {
    setTab(value);
  };

  useEffect(() => {
    navigate(tab);
  }, [navigate, tab]);

  return (
    <>
      <Typography component="h2" variant="h2">
        Settings
      </Typography>

      <Tabs value={tab} onChange={handleTabChange}>
        <Tab value="users/students" label="Students" />
        <Tab value="users/teachers" label="Teachers" />
        <Tab value="users/create" label="Create user" />
      </Tabs>

      <Centered>
        <Outlet />
      </Centered>
    </>
  );
}
