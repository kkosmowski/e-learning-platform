import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { useAuth } from 'contexts/auth';
import Container from 'shared/components/Container';
import { Role } from 'shared/types/user';
import { isUserPermitted } from 'shared/utils/user.utils';

interface SettingsLayoutProps {
  limitedTo: Role;
}

export default function SettingsLayout(props: SettingsLayoutProps) {
  const { limitedTo } = props;
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const userPermitted = useMemo(
    () => isUserPermitted(currentUser, limitedTo),
    [currentUser, limitedTo]
  );

  useEffect(() => {
    if (userPermitted === false) {
      navigate('/404');
    }
  }, [userPermitted, navigate]);

  if (userPermitted === false) {
    return null;
  }

  return (
    <Container sx={{ p: 0, overflow: 'hidden', flex: 1 }}>
      <Outlet />
    </Container>
  );
}
