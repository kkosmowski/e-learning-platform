import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getUser } from 'api/user';
import { mapUserDtoToUser } from 'shared/utils/user.utils';
import { User } from 'shared/types/user';

interface UserDetailsProps {
  mode: 'view' | 'edit';
}

export default function UserDetails(props: UserDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: userId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  const fetchUser = useCallback(async (userId: string) => {
    try {
      const { data: user } = await getUser(userId);
      setCurrentUser(mapUserDtoToUser(user));
    } catch (error) {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      void fetchUser(userId);
    }
  }, [fetchUser, userId]);

  if (currentUser === null) {
    navigate('/404');
    return null;
  } else if (currentUser === undefined) {
    return null;
  }
  return <>{currentUser.fullName}</>;
}
