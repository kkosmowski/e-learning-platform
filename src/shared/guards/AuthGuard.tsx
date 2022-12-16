import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/auth';

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
