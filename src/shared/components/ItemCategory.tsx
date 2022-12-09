import {
  Assignment,
  HomeWork,
  MoodBad,
  PanTool,
  Quiz,
  SvgIconComponent,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Box, SxProps, Typography } from '@mui/material';

import { TaskType } from 'shared/types/task';
import { TestType } from 'shared/types/test';
import { GradeType } from 'shared/types/grade';

interface ItemCategoryProps {
  type: TaskType | TestType | GradeType;
  sx?: SxProps;
}

export default function ItemCategory(props: ItemCategoryProps) {
  const { type, sx } = props;
  const { t } = useTranslation('common');

  let Icon: SvgIconComponent;
  let translationKey: string;

  if (type === TaskType.Task) {
    Icon = Assignment;
    translationKey = TaskType.Task;
  } else if (type === TaskType.Homework) {
    Icon = HomeWork;
    translationKey = TaskType.Homework;
  } else if (type === GradeType.ACTIVITY) {
    Icon = PanTool;
    translationKey = GradeType.ACTIVITY;
  } else if (type === GradeType.BEHAVIOUR) {
    Icon = MoodBad;
    translationKey = GradeType.BEHAVIOUR;
  } else {
    Icon = Quiz;
    translationKey = 'test';
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
      <Icon sx={{ fontSize: 16 }} />

      <Typography sx={{ fontSize: 14, color: 'inherit' }}>
        {t(translationKey)}
      </Typography>
    </Box>
  );
}
