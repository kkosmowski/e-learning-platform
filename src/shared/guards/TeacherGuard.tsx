import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { isTeacher } from 'shared/utils/user.utils';
import { useAuth } from 'contexts/auth';

interface TeacherGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function TeacherGuard(props: TeacherGuardProps) {
  const { children, redirectTo } = props;
  const { currentUser } = useAuth();

  if (!isTeacher(currentUser)) {
    return <Navigate to={redirectTo || '/'} replace />;
  }

  return <>{children}</>;
}
