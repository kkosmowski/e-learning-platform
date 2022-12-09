import {
  Divider,
  Grid,
  Link as MuiLink,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { HelpOutline } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';

import { CalculatedGradeType, Grade, GradeType } from 'shared/types/grade';
import ItemCategory from 'shared/components/ItemCategory';

interface GradeRowProps {
  grade: Grade;
  showDivider?: boolean;
  showNames?: boolean;
  keepEmptyColumns?: boolean;
  hideDate?: boolean;
}

const gradeTooltips = Object.values(CalculatedGradeType) as (
  | CalculatedGradeType
  | GradeType
)[];

export default function GradeRow(props: GradeRowProps) {
  const { subjectId } = useParams();
  const {
    grade: { value, type, task, name, createdAt, user },
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
          } 5fr 40px`,
          ...((keepEmptyColumns || showNames) && { minWidth: 640 }),
        }}
      >
        <Grid item>
          <Typography
            sx={{ flex: 2, display: 'inline-flex', alignItems: 'center' }}
          >
            {task ? (
              <MuiLink
                component={Link}
                to={`/subjects/${subjectId}/tasks/${task.id}`}
              >
                {task.name}
              </MuiLink>
            ) : (
              name
            )}

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
          {!hideDate && createdAt && (
            <Typography
              component="span"
              sx={{ color: 'text.secondary', fontSize: 13 }}
            >
              {format(new Date(createdAt), 'dd-MM-yyyy')}
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
                {user.fullName}
              </Typography>
            )}
          </Grid>
        )}

        <Grid item>
          <ItemCategory
            type={task ? task.type : type}
            sx={{ flex: 1, color: 'text.secondary' }}
          />
        </Grid>

        <Grid item>
          <Typography
            sx={{
              fontSize: 'inherit',
              fontWeight: 'bold',
              ...(value === 1 && { color: 'text.error' }),
            }}
          >
            {value || '—'}
          </Typography>
        </Grid>
      </Grid>

      {showDivider && <Divider />}
    </>
  );
}
