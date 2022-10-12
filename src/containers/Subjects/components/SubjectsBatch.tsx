import { ReactNode } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { Subject } from 'shared/types/subject';

interface SubjectsBatchProps {
  label: ReactNode;
  subjects: Subject[];
  onSubjectClick: (subjectId: string) => void;
}

export default function SubjectsBatch(props: SubjectsBatchProps) {
  const { label, subjects, onSubjectClick } = props;

  return (
    <Stack sx={{ gap: 1, mt: 5 }}>
      <Typography variant="h2">{label}</Typography>

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
    </Stack>
  );
}
