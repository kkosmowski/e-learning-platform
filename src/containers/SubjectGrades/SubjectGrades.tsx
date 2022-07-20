import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { CURRENT_USER } from 'shared/consts/user';
import SubjectGradesStudent from './SubjectGradesStudent';
import SubjectGradesTeacher from './SubjectGradesTeacher';

export default function SubjectGrades() {
  if (isTeacher(CURRENT_USER)) {
    return <SubjectGradesTeacher />;
  }
  if (isStudent(CURRENT_USER)) {
    return <SubjectGradesStudent />;
  }

  throw new Error('User is neither Teacher nor Student.');
}
