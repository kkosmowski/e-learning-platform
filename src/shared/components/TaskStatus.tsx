import { Box } from '@mui/material';
import { Status } from '../types/shared';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  DisabledByDefault,
  SvgIconComponent,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const getStatusIconAndColor = (
  status: Status,
  isFinished: boolean
): [SvgIconComponent, string] => {
  switch (status) {
    case Status.NOT_SUBMITTED:
      if (isFinished) {
        return [DisabledByDefault, 'text.error'];
      }
      return [CheckBoxOutlineBlank, ''];
    case Status.SUBMITTED:
      return [CheckBoxOutlined, 'text.info'];
    case Status.GRADED:
      return [CheckBox, 'text.success'];
  }
};

interface TaskStatusProps {
  status: Status;
  isFinished: boolean;
}

export default function TaskStatus(props: TaskStatusProps) {
  const { status, isFinished } = props;
  const { t } = useTranslation('task');

  const [StatusIcon, statusColor] = getStatusIconAndColor(status, isFinished);
  const statusKey =
    !isFinished && status === Status.NOT_SUBMITTED ? 'to_submit' : status;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: 1,
        color: statusColor,
      }}
    >
      <StatusIcon sx={{ fontSize: 16 }} />
      <span>{t(`statuses.${statusKey}`)}</span>
    </Box>
  );
}
