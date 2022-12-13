import { useMemo, useState } from 'react';
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
import LabelledCheckbox from 'shared/components/LabelledCheckbox';
import colors from 'colors';

export type FinalGradeDialogType = 'propose' | 'change' | 'confirm';

interface FinalGradeDialogProps {
  type: FinalGradeDialogType;
  student: User;
  averageGrade: number;
  proposedGrade?: number;
  onSubmit: (type: FinalGradeDialogType, value: number) => void;
  onClose: () => void;
}

const grades = [1, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function FinalGradeDialog(props: FinalGradeDialogProps) {
  const { type, student, averageGrade, proposedGrade, onSubmit, onClose } =
    props;
  const [value, setValue] = useState(proposedGrade || 0);
  const [understood, setUnderstood] = useState(false);
  const { t } = useTranslation('grade');

  const titleKey = `final.dialog.title.${type}`;
  const isLargeDifference = useMemo(
    () => Math.abs(value - averageGrade) > (averageGrade > 5.5 ? 1 : 0.5),
    [value, averageGrade]
  );
  const subTextKey = useMemo(
    () =>
      value
        ? isLargeDifference
          ? 'grade:final.dialog.largeDifference'
          : 'grade:final.dialog.current'
        : 'grade:final.dialog.selectValue',
    [value, isLargeDifference]
  );

  const handleSubmit = () => {
    onSubmit(type, value);
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
                i18nKey={`grade:final.dialog.message.${type}`}
                values={{
                  studentName: student.fullName,
                  averageGrade,
                  proposedGrade,
                }}
              >
                <strong style={{ color: colors.text.primary }} />
              </Trans>
            </Typography>

            {type !== 'confirm' && (
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
            )}

            {type !== 'confirm' && (
              <Typography
                {...(value && {
                  color: isLargeDifference ? 'text.warning' : 'primary',
                })}
              >
                <Trans i18nKey={subTextKey} values={{ value, averageGrade }}>
                  <strong />
                </Trans>
              </Typography>
            )}

            <LabelledCheckbox
              label={t(`grade:final.dialog.checkbox.${type}`)}
              value={understood}
              onChange={(e) => setUnderstood(e.target.checked)}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                disabled={
                  !value ||
                  !understood ||
                  (value === proposedGrade && type !== 'confirm')
                }
                onClick={handleSubmit}
              >
                {t(type)}
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
