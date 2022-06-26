import { Box, Divider, Typography } from '@mui/material';

import { Grade, GradeType } from 'shared/types/subject';
import ItemCategory from 'shared/components/ItemCategory';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';

interface GradeRowProps {
  grade: Grade;
  showDivider: boolean;
}

export default function GradeRow(props: GradeRowProps) {
  const {
    grade: { value, source, type, createdAt },
    showDivider,
  } = props;
  const { t } = useTranslation('subject');

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, p: 1 }}>
        <Typography sx={{ flex: 2 }}>
          {source && type === GradeType.Assignment
            ? source.title
            : t(`grades.${type}`)}

          <Typography
            component="span"
            sx={{ ml: 2, color: 'text.secondary', fontSize: 13 }}
          >
            {format(new Date(createdAt), 'dd-MM-yyyy')}
          </Typography>
        </Typography>

        {source && (
          <ItemCategory
            type={source.type}
            sx={{ flex: 1, color: 'text.secondary' }}
          />
        )}

        <Typography sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>

      {showDivider && <Divider />}
    </>
  );
}
