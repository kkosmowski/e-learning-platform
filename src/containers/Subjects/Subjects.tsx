import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import { Centered } from 'shared/components/Container';
import { subjects } from 'shared/consts/subject';
import useCustomNavigate from 'hooks/use-custom-navigate';

export default function Subjects() {
  const { navigate } = useCustomNavigate();

  const handleSubjectClick = (subjectId: string): void => {
    navigate(subjectId);
  };

  return (
    <Centered>
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
    </Centered>
  );
}
