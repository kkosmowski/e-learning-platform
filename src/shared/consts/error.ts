import { SECOND } from './date';

export const unknownError = 'error:UNKNOWN_ERROR';

export const invalidFormError = 'error:INVALID_FORM';

export const sessionExpiredError = 'error:SESSION_EXPIRED';

export const fileTooBigError = 'error:FILE_TOO_BIG';

export const incorrectEmailError = 'error:INCORRECT_EMAIL';
export const emailRequiredError = 'error:EMAIL_REQUIRED';
export const titleRequiredError = 'error:TITLE_REQUIRED';
export const contentRequiredError = 'error:CONTENT_REQUIRED';
export const passwordRequiredError = 'error:PASSWORD_REQUIRED';
export const passwordTooShortError = 'error:PASSWORD_TOO_SHORT';
export const passwordTooLongError = 'error:PASSWORD_TOO_LONG';
export const firstNameRequiredError = 'error:FIRST_NAME_REQUIRED';
export const roleRequiredError = 'error:ROLE_REQUIRED';
export const publishTimeRequiredError = 'error:PUBLISH_TIME_REQUIRED';

// user errors
export const emailTakenError = 'error:EMAIL_TAKEN';

// class errors
export const classNameRequiredError = 'error:Class_NAME_REQUIRED';
export const classNameTakenError = 'error:Class_NAME_TAKEN';
export const classTeacherRequiredError = 'error:Class_TEACHER_REQUIRED';

// grade errors
export const subjectRequiredError = 'error:SUBJECT_REQUIRED';
export const studentRequiredError = 'error:STUDENT_REQUIRED';
export const gradeValueRequiredError = 'error:GRADE_VALUE_REQUIRED';

export const ERROR_TOAST_DURATION = 10 * SECOND;
