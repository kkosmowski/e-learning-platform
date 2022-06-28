import { Box, Card, CardContent, SxProps } from '@mui/material';

import { Grade } from 'shared/types/grade';
import GradeRow from './GradeRow';

interface GradeCardProps {
  grades: Grade[];
  sx?: SxProps;
}

export default function GradeCard(props: GradeCardProps) {
  const { grades, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {grades.map((grade, index) => (
            <GradeRow
              key={grade.id}
              grade={grade}
              showDivider={index !== grades.length - 1}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
