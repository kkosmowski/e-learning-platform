import { useNavigate } from 'react-router';
import Container from 'shared/components/Container';
import { Card } from '@mui/material';

export default function Notice() {
  const navigate = useNavigate();

  const navigateHome = (): void => {
    navigate('/');
  };

  return <Card>Notice!</Card>;
}
