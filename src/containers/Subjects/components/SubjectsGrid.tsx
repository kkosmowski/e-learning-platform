import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import { Subject } from 'shared/types/subject';

interface SubjectGridProps {
  subjects: Subject[];
  onSubjectClick: (subjectId: string) => void;
}

export default function SubjectsGrid(props: SubjectGridProps) {
  const { subjects, onSubjectClick } = props;

  return (
    <Grid container spacing={2}>
      {subjects.map((subject) => (
        <Grid item key={subject.id} xs={12} md={6} lg={4} xl={3}>
          <Card onClick={() => onSubjectClick(subject.id)}>
            <CardActionArea>
              <CardContent>
                <Typography component="h3">{subject.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
