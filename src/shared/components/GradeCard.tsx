import { Box, Card, CardContent, SxProps } from '@mui/material';

import { Grade } from 'shared/types/grade';
import GradeRow from './GradeRow';

interface GradeCardProps {
  grades: Grade[];
  shortName?: boolean;
  showNames?: boolean;
  hideDate?: boolean;
  keepEmptyColumns?: boolean; // maintains alignment of different grade types
  sx?: SxProps;
}

export default function GradeCard(props: GradeCardProps) {
  const { grades, shortName, showNames, hideDate, keepEmptyColumns, sx } =
    props;

  return (
    <Card sx={sx}>
      <CardContent sx={{ overflow: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {grades.map((grade, index) => (
            <GradeRow
              key={grade.id}
              grade={grade}
              shortName={shortName}
              showNames={showNames}
              hideDate={hideDate}
              keepEmptyColumns={keepEmptyColumns}
              showDivider={index !== grades.length - 1}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
