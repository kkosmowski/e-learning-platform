import { useNavigate, useParams, Outlet } from 'react-router';
import { Box } from '@mui/material';

import { subjects } from 'shared/consts/subject';
import SubjectHeader from './components/SubjectHeader';

export default function Subject() {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const currentSubject = subjects.find((subject) => subject.id === subjectId);

  if (!currentSubject) {
    navigate('/404');
    return null;
  }

  return (
    <Box>
      <SubjectHeader title={currentSubject.label} />
      <Outlet />
    </Box>
  );
}
