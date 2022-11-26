import {
  CreateUserForm,
  CreateUserPayload,
  Role,
  SimpleUser,
  SimpleUserDto,
  User,
  UserDto,
} from 'shared/types/user';

export const isStudent = (user?: User | null): boolean =>
  user?.role === Role.Student;
export const isTeacher = (user?: User | null): boolean =>
  user?.role === Role.Teacher;

export const mapSimpleUserDtoToSimpleUser = (
  dto: SimpleUserDto
): SimpleUser => ({
  id: dto.id,
  firstName: dto.first_name,
  lastName: dto.last_name,
  fullName: `${dto.first_name} ${dto.last_name}`,
});

export const mapUserDtoToUser = (dto: UserDto): User => ({
  ...mapSimpleUserDtoToSimpleUser(dto),
  email: dto.email,
  role: dto.role,
  createdAt: dto.created_at,
  active: dto.is_active,
});

export const mapPartialUserToUserDto = (
  user: Partial<User>
): Partial<UserDto> => ({
  ...(user.id !== undefined && { id: user.id }),
  ...(user.firstName !== undefined && { first_name: user.firstName }),
  ...(user.lastName !== undefined && { last_name: user.lastName }),
  ...(user.email !== undefined && { email: user.email }),
  ...(user.role !== undefined && { role: user.role }),
  ...(user.createdAt !== undefined && { created_at: user.createdAt }),
  ...(user.active !== undefined && { is_active: user.active }),
});

export const mapCreateUserFormToCreateUserPayload = (
  form: CreateUserForm
): CreateUserPayload => ({
  email: form.email,
  first_name: form.firstName,
  last_name: form.lastName,
  role: form.role,
});

export const isUserPermitted = (
  user: User | null | undefined,
  limitedTo?: Role | Role[]
): boolean | undefined => {
  if (user === undefined) return undefined;
  if (user === null) return false;
  if (!limitedTo) return true;

  return typeof limitedTo === 'object'
    ? limitedTo.includes(user.role)
    : limitedTo === user.role;
};
