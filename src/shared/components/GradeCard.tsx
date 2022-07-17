import { Box, Card, CardContent, SxProps } from '@mui/material';

import { Grade } from 'shared/types/grade';
import GradeRow from './GradeRow';

interface GradeCardProps {
  grades: Grade[];
  showNames?: boolean;
  keepEmptyColumns?: boolean; // maintains alignment of different grade types
  sx?: SxProps;
}

export default function GradeCard(props: GradeCardProps) {
  const { grades, showNames, keepEmptyColumns, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent sx={{ overflow: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {grades.map((grade, index) => (
            <GradeRow
              key={grade.id}
              grade={grade}
              showNames={showNames}
              keepEmptyColumns={keepEmptyColumns}
              showDivider={index !== grades.length - 1}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
