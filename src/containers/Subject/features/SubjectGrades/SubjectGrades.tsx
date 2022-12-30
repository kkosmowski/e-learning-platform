import { isStudent, isTeacher } from 'shared/utils/user.utils';
import SubjectGradesStudent from './SubjectGradesStudent';
import SubjectGradesTeacher from './SubjectGradesTeacher';
import { useAuth } from 'contexts/auth';

export default function SubjectGrades() {
  const { currentUser } = useAuth();
  if (isTeacher(currentUser)) {
    return <SubjectGradesTeacher />;
  }
  if (isStudent(currentUser)) {
    return <SubjectGradesStudent />;
  }

  throw new Error('User is neither Teacher nor Student.');
}
