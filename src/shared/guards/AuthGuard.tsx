import { ReactNode, useEffect } from 'react';

import { useAuth } from 'contexts/auth';
import useCustomNavigate from 'hooks/use-custom-navigate';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard(props: AuthGuardProps) {
  const { children } = props;
  const { navigate } = useCustomNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser === null) {
      navigate('/auth', { replace: true });
    }
  }, [currentUser, navigate]);

  return <>{children}</>;
}
