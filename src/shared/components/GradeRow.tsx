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

import {
  Grade,
  GradeType,
  VirtualGrade,
  VirtualGradeType,
} from 'shared/types/grade';
import ItemCategory from 'shared/components/ItemCategory';
import { fixGradeValue, isVirtualGrade } from 'shared/utils/grade.utils';
import { Task } from 'shared/types/task';
import { ellipsisSx } from 'shared/consts/styles';

interface GradeRowProps {
  grade: Grade | VirtualGrade;
  shortName?: boolean;
  showDivider?: boolean;
  showNames?: boolean;
  keepEmptyColumns?: boolean;
  hideDate?: boolean;
}

const gradeTooltips = Object.values(VirtualGradeType) as (
  | VirtualGradeType
  | GradeType
)[];

export default function GradeRow(props: GradeRowProps) {
  const { subjectId } = useParams();
  const {
    grade,
    shortName,
    showDivider,
    showNames,
    keepEmptyColumns,
    hideDate = false,
  } = props;
  const { t } = useTranslation('subject');
  const { value, type, createdAt, user } = grade;
  let name: string | undefined = undefined;
  let task: Task | undefined = undefined;

  const isVirtual = isVirtualGrade(grade);

  if (!isVirtual) {
    name = grade.name;
    task = grade.task;
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          display: 'grid',
          alignItems: 'center',
          p: 1,
          gridTemplateColumns: `${shortName ? '50%' : '10fr'} ${
            !keepEmptyColumns && hideDate ? '' : '140px'
          } ${keepEmptyColumns || showNames ? 'minmax(180px, 3fr)' : ''} ${
            !keepEmptyColumns && isVirtual ? '' : 'minmax(140px, 5fr)'
          } 40px`,
          ...((keepEmptyColumns || showNames) && { minWidth: 640 }),
          ...(type === VirtualGradeType.FINAL &&
            !!value && { color: 'primary.main' }),
        }}
      >
        <Grid item>
          {isVirtual ? (
            <>
              <Typography
                sx={{
                  flex: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  ...(type === VirtualGradeType.FINAL && { fontWeight: 600 }),
                }}
              >
                {t(`grade:type.${type}`)}

                {gradeTooltips.includes(type) && (
                  <Tooltip title={t(`grades.tooltip.${type}`)}>
                    <HelpOutline
                      sx={{ fontSize: 16, color: 'text.secondary', ml: 0.5 }}
                    />
                  </Tooltip>
                )}
              </Typography>
            </>
          ) : (
            <Tooltip title={shortName && name ? name : ''}>
              <Typography
                sx={{
                  flex: 2,
                  ...(!shortName ? { display: 'inline-flex' } : ellipsisSx),
                  alignItems: 'center',
                }}
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
              </Typography>
            </Tooltip>
          )}
        </Grid>

        {!hideDate && (
          <Grid item>
            {createdAt && (
              <Typography
                component="span"
                sx={{ color: 'text.secondary', fontSize: 13 }}
              >
                {format(new Date(createdAt), 'dd-MM-yyyy')}
              </Typography>
            )}
          </Grid>
        )}

        {(keepEmptyColumns || showNames) && (
          <Grid item>
            {showNames && (
              <MuiLink
                component={Link}
                sx={{ color: 'text.secondary', fontSize: 13 }}
                to={`/subjects/${subjectId}/grades/${user.id}`}
              >
                {user.fullName}
              </MuiLink>
            )}
          </Grid>
        )}

        {!isVirtual && (
          <Grid item>
            <ItemCategory
              type={task ? task.type : type}
              sx={{ flex: 1, color: 'text.secondary' }}
            />
          </Grid>
        )}

        <Grid item>
          <Typography
            sx={{
              fontSize: 'inherit',
              fontWeight: 'bold',
              ...(value === 1 && { color: 'text.error' }),
            }}
          >
            {fixGradeValue(value) || '—'}
          </Typography>
        </Grid>
      </Grid>

      {showDivider && <Divider />}
    </>
  );
}
