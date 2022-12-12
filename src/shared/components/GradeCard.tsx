import { Box, Card, CardContent, SxProps, Typography } from '@mui/material';

import { Grade } from 'shared/types/grade';
import GradeRow from './GradeRow';
import { useTranslation } from 'react-i18next';

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

  return (
    <Card sx={sx}>
      <CardContent sx={{ overflow: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {title && <Typography>{title}</Typography>}

          {grades.length ? (
            grades.map((grade, index) => (
              <GradeRow
                key={grade.id}
                grade={grade}
                shortName={shortName}
                showNames={showNames}
                hideDate={hideDate}
                keepEmptyColumns={keepEmptyColumns}
                showDivider={index !== grades.length - 1}
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
