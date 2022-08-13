import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'contexts/auth';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard(props: AuthGuardProps) {
  const { children } = props;
  const { currentUser } = useAuth();

  if (currentUser === null) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
