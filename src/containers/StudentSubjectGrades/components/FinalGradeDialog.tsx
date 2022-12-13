import { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

import Dialog from 'shared/components/Dialog';
import { User } from 'shared/types/user';

interface FinalGradeDialogProps {
  state: 'propose' | 'confirm';
  student: User;
  averageGrade: number;
  onSubmit: (type: 'propose' | 'confirm', value: number) => void;
  onClose: () => void;
}

const grades = [1, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function FinalGradeDialog(props: FinalGradeDialogProps) {
  const [value, setValue] = useState(0);
  const { state, student, averageGrade, onSubmit, onClose } = props;
  const { t } = useTranslation('grade');

  const titleKey = `final.dialog.title.${state}`;
  const isLargeDifference =
    Math.abs(value - averageGrade) > (averageGrade > 5.5 ? 1 : 0.5);
  const subTextKey = value
    ? isLargeDifference
      ? 'grade:final.dialog.largeDifference'
      : 'grade:final.dialog.current'
    : 'grade:final.dialog.selectValue';

  const handleSubmit = () => {
    onSubmit(state, value);
  };

  return (
    <Dialog
      open
      sx={{
        '.MuiPaper-root': {
          width: 600,
        },
      }}
      title={t(titleKey)}
      content={
        <form>
          <Stack gap={2}>
            <Typography>
              <Trans
                i18nKey={'grade:final.dialog.message'}
                values={{ studentName: student.fullName, averageGrade }}
              >
                <strong />
              </Trans>
            </Typography>

            <ToggleButtonGroup
              exclusive
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              {grades.map((value) => (
                <GradeButton key={value} value={value}>
                  {value}
                </GradeButton>
              ))}
            </ToggleButtonGroup>

            <Typography
              {...(value && {
                color: isLargeDifference ? 'text.warning' : 'primary',
              })}
            >
              <Trans i18nKey={subTextKey} values={{ value, averageGrade }}>
                <strong />
              </Trans>
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                disabled={!value}
                onClick={handleSubmit}
              >
                {t('propose')}
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => onClose()}
              >
                {t('common:cancel')}
              </Button>
            </Box>
          </Stack>
        </form>
      }
    />
  );
}

const GradeButton = styled(ToggleButton)(() => ({
  width: 48,
  height: 48,
  font: 'inherit',
  fontSize: 16,
  fontWeight: 700,
}));
