import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';

import { subjects } from 'shared/consts/subject';
import Container from 'shared/components/Container';

export default function Subjects() {
  const navigate = useNavigate();

  const handleSubjectClick = (subjectId: string): void => {
    navigate(subjectId);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {subjects.map((subject) => (
          <Grid item key={subject.id} xs={12} md={6} lg={4} xl={3}>
            <Card onClick={() => handleSubjectClick(subject.id)}>
              <CardActionArea>
                <CardContent>
                  <Typography component="h2">{subject.label}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
