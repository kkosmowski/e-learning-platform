import { useNavigate } from 'react-router';
import Container from 'shared/components/Container';

export default function NoticeBoard() {
  const navigate = useNavigate();

  const navigateHome = (): void => {
    navigate('/');
  };

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      Notice board
    </Container>
  );
}
