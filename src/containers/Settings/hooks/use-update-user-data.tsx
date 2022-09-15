import { UpdateUserPayload, User } from 'shared/types/user';
import {
  mapPartialUserToUserDto,
  mapUserDtoToUser,
} from 'shared/utils/user.utils';
import { updateUser } from 'api/user';
import { getErrorDetail } from 'shared/utils/common.utils';

interface UseUpdateUserDataProps {
  id: string;
  userData: Partial<User>;
  onSuccess?: (data: User) => void;
  onError?: (error: string) => void;
}

export default function useUpdateUserData() {
  return ({ id, userData, onSuccess, onError }: UseUpdateUserDataProps) =>
    new Promise<void>((resolve, reject) => {
      try {
        const payload = mapPartialUserToUserDto({
          id: id,
          ...userData,
        }) as UpdateUserPayload;

        (async () => {
          const { data: updatedUserDto } = await updateUser(payload);
          if (onSuccess) {
            onSuccess(mapUserDtoToUser(updatedUserDto));
          }
          resolve();
        })();
      } catch (err: unknown) {
        const error = getErrorDetail(err);
        if (onError) {
          onError(error);
        }
        reject();
      }
    });
}
