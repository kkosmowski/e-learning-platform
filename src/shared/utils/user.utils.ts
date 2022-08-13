import {
  CreateUserForm,
  CreateUserPayload,
  Person,
  Role,
  User,
  UserDto,
} from 'shared/types/user';

export const isStudent = (user: Person): boolean => user.role === Role.Student;

export const isTeacher = (user: Person): boolean => user.role === Role.Teacher;

export const mapUserDtoToUser = (userDto: UserDto): User => ({
  id: userDto.id,
  firstName: userDto.first_name,
  lastName: userDto.last_name,
  email: userDto.email,
  role: userDto.role,
  createdAt: userDto.created_at,
  active: userDto.is_active,
  fullName: `${userDto.first_name} ${userDto.last_name}`,
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
  limitedTo?: Role
): boolean => {
  if (!user) return false;
  if (!limitedTo) return true;

  return limitedTo === user.role;
};
