import { ReactNode, useEffect } from 'react';

import { useAuth } from 'contexts/auth';
import { useNavigate } from 'react-router';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard(props: AuthGuardProps) {
  const { children } = props;
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser === null) {
      navigate('/auth', { replace: true });
    }
  }, [currentUser, navigate]);

  return <>{children}</>;
}
