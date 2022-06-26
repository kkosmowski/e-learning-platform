import { Box, Divider, Tooltip, Typography } from '@mui/material';

import { Grade, GradeType } from 'shared/types/grade';
import ItemCategory from 'shared/components/ItemCategory';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { HelpOutline } from '@mui/icons-material';

interface GradeRowProps {
  grade: Grade;
  showDivider?: boolean;
  hideDate?: boolean;
}

const gradeTooltips = [GradeType.Average, GradeType.Proposed, GradeType.Final];

export default function GradeRow(props: GradeRowProps) {
  const {
    grade: { value, source, type, createdAt },
    showDivider,
    hideDate = false,
  } = props;
  const { t } = useTranslation('subject');

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, p: 1 }}>
        <Typography
          sx={{ flex: 2, display: 'inline-flex', alignItems: 'center' }}
        >
          {source && type === GradeType.Assignment
            ? source.title
            : t(`grades.${type}`)}

          {gradeTooltips.includes(type) && (
            <Tooltip title={t(`grades.tooltip.${type}`)}>
              <HelpOutline
                sx={{ fontSize: 16, color: 'text.secondary', ml: 0.5 }}
              />
            </Tooltip>
          )}

          {!hideDate && createdAt && (
            <Typography
              component="span"
              sx={{ ml: 2, color: 'text.secondary', fontSize: 13 }}
            >
              {format(new Date(createdAt), 'dd-MM-yyyy')}
            </Typography>
          )}
        </Typography>

        {source && (
          <ItemCategory
            type={source.type}
            sx={{ flex: 1, color: 'text.secondary' }}
          />
        )}

        <Typography sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
          {value || '—'}
        </Typography>
      </Box>

      {showDivider && <Divider />}
    </>
  );
}
