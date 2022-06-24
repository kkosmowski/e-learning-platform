import {
  Assignment,
  HomeWork,
  Quiz,
  SvgIconComponent,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Box, SxProps, Typography } from '@mui/material';

import { TaskType } from 'shared/types/task';
import { TestType } from 'shared/types/test';

interface ItemCategoryProps {
  type: TaskType | TestType;
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
