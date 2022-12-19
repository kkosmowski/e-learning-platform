import { Box, Card, CardContent, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Grade, VirtualGradeType } from 'shared/types/grade';
import GradeRow, { GradeRowOption } from './GradeRow';
import { useMemo } from 'react';

interface GradeCardProps {
  title?: string;
  grades: Grade[];
  shortName?: boolean;
  showNames?: boolean;
  hideDate?: boolean;
  keepEmptyColumns?: boolean; // maintains alignment of different grade types
  options?: GradeRowOption[];
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
    options,
  } = props;
  const { t } = useTranslation('grade');

  const filteredGrades = useMemo(
    () =>
      grades.filter(
        ({ type }) =>
          type !== VirtualGradeType.PROPOSED && type !== VirtualGradeType.FINAL
      ),
    [grades]
  );

  const gradeRows = useMemo(
    () =>
      filteredGrades.map((grade, index) => (
        <GradeRow
          key={grade.id}
          grade={grade}
          shortName={shortName}
          showNames={showNames}
          hideDate={hideDate}
          keepEmptyColumns={keepEmptyColumns}
          showDivider={index !== filteredGrades.length - 1}
          options={options}
        />
      )),
    [filteredGrades, hideDate, keepEmptyColumns, options, shortName, showNames]
  );

  return (
    <Card sx={sx}>
      <CardContent sx={{ overflow: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {title && <Typography>{title}</Typography>}

          {filteredGrades.length ? (
            gradeRows
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
