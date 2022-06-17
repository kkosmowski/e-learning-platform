import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/material';

import { subjects } from 'shared/consts/subject';
import Container from 'shared/components/Container';
import SubjectHeader from './components/SubjectHeader';

export default function Subject() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const currentSubject = subjects.find((subject) => subject.id === subjectId);

  if (!currentSubject) {
    navigate('/404');
    return null;
  }

  return (
    <Box>
      <SubjectHeader title={currentSubject.label} />
      <Container>hehe</Container>
    </Box>
  );
}
