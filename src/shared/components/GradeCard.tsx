import { Box, Card, CardContent, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Grade, VirtualGradeType } from 'shared/types/grade';
import GradeRow from './GradeRow';

interface GradeCardProps {
  title?: string;
  grades: Grade[];
  shortName?: boolean;
  showNames?: boolean;
  hideDate?: boolean;
  keepEmptyColumns?: boolean; // maintains alignment of different grade types
  sx?: SxProps;
}

export default function GradeCard(props: GradeCardProps) {
  const {
    title,
    grades,
    shortName,
    showNames,
    hideDate,
    keepEmptyColumns,
    sx,
  } = props;
  const { t } = useTranslation('grade');

  const filteredGrades = grades.filter(
    ({ type }) =>
      type !== VirtualGradeType.PROPOSED && type !== VirtualGradeType.FINAL
  );

  return (
    <Card sx={sx}>
      <CardContent sx={{ overflow: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {title && <Typography>{title}</Typography>}

          {filteredGrades.length ? (
            filteredGrades.map((grade, index) => (
              <GradeRow
                key={grade.id}
                grade={grade}
                shortName={shortName}
                showNames={showNames}
                hideDate={hideDate}
                keepEmptyColumns={keepEmptyColumns}
                showDivider={index !== filteredGrades.length - 1}
              />
            ))
          ) : (
            <Typography sx={{ fontSize: 15, mt: 1 }} color="text.secondary">
              {t('noItems')}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
