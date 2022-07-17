import { Divider, Grid, Tooltip, Typography } from '@mui/material';

import { Grade, GradeType } from 'shared/types/grade';
import ItemCategory from 'shared/components/ItemCategory';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { HelpOutline } from '@mui/icons-material';

interface GradeRowProps {
  grade: Grade;
  showDivider?: boolean;
  showNames?: boolean;
  keepEmptyColumns?: boolean;
  hideDate?: boolean;
}

const gradeTooltips = [GradeType.Average, GradeType.Proposed, GradeType.Final];

export default function GradeRow(props: GradeRowProps) {
  const {
    grade: { value, source, type, createdOn, student },
    showDivider,
    showNames,
    keepEmptyColumns,
    hideDate = false,
  } = props;
  const { t } = useTranslation('subject');

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          display: 'grid',
          alignItems: 'center',
          p: 1,
          gridTemplateColumns: `10fr 120px ${
            keepEmptyColumns || showNames ? 'minmax(180px, 3fr)' : ''
          } ${keepEmptyColumns || source ? '5fr' : ''} 40px`,
          ...((keepEmptyColumns || showNames) && { minWidth: 640 }),
        }}
      >
        <Grid item>
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
          </Typography>
        </Grid>

        <Grid item>
          {!hideDate && createdOn && (
            <Typography
              component="span"
              sx={{ color: 'text.secondary', fontSize: 13 }}
            >
              {format(new Date(createdOn), 'dd-MM-yyyy')}
            </Typography>
          )}
        </Grid>

        {(keepEmptyColumns || showNames) && (
          <Grid item>
            {showNames && (
              <Typography
                component="span"
                sx={{ color: 'text.secondary', fontSize: 13 }}
              >
                {student.fullName}
              </Typography>
            )}
          </Grid>
        )}

        {(keepEmptyColumns || source) && (
          <Grid item>
            {source && (
              <ItemCategory
                type={source.type}
                sx={{ flex: 1, color: 'text.secondary' }}
              />
            )}
          </Grid>
        )}

        <Grid item>
          <Typography sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
            {value || '—'}
          </Typography>
        </Grid>
      </Grid>

      {showDivider && <Divider />}
    </>
  );
}
