import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { isTeacher } from 'shared/utils/user.utils';
import { CURRENT_USER } from 'shared/consts/user';

interface TeacherGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function TeacherGuard(props: TeacherGuardProps) {
  const { children, redirectTo } = props;

  if (!isTeacher(CURRENT_USER)) {
    return <Navigate to={redirectTo || '/'} replace />;
  }

  return <>{children}</>;
}
