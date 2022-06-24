import { Box, Typography } from '@mui/material';

import { Grade } from 'shared/types/subject';
import ItemCategory from 'shared/components/ItemCategory';

interface GradeRowProps {
  grade: Grade;
}

export default function GradeRow(props: GradeRowProps) {
  const {
    grade: { value, source },
  } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <ItemCategory
        type={source.type}
        sx={{ flex: 1, color: 'text.secondary' }}
      />

      <Typography sx={{ flex: 3 }}>{source.title}</Typography>

      <Typography sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Box>
  );
}
