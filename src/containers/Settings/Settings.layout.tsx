import { Outlet, useNavigate } from 'react-router';

import { useAuth } from 'contexts/auth';
import Container from 'shared/components/Container';
import { Role } from 'shared/types/user';
import { isUserPermitted } from 'shared/utils/user.utils';
import ViewHeader from '../../layouts/Application/components/ViewHeader';
import { useTranslation } from 'react-i18next';

interface SettingsLayoutProps {
  limitedTo: Role;
}

export default function SettingsLayout(props: SettingsLayoutProps) {
  const { limitedTo } = props;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!isUserPermitted(currentUser, limitedTo)) {
    navigate('/404');
    return null;
  }

  return (
    <Container sx={{ p: 0, overflow: 'hidden', flex: 1 }}>
      <Outlet />
    </Container>
  );
}
