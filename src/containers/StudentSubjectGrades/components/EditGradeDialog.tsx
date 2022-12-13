import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import format from 'date-fns/format';

import Dialog from 'shared/components/Dialog';
import { Grade } from 'shared/types/grade';
import colors from 'colors';
import GradeValueSelect from 'shared/components/GradeValueSelect';

interface EditGradeDialogProps {
  grade: Grade;
  onSubmit: (value: number) => void;
  onCancel: () => void;
}

export default function EditGradeDialog(props: EditGradeDialogProps) {
  const { grade, onSubmit, onCancel } = props;
  const [value, setValue] = useState(grade.value);
  const { t } = useTranslation('grade');

  return (
    <Dialog
      open
      title={t('update.title')}
      sx={{
        '.MuiPaper-root': {
          width: 500,
        },
      }}
      content={
        <Stack spacing={2}>
          <Typography>
            <Trans
              i18nKey={`grade:update.message.${grade.type}`}
              values={{
                studentName: grade.user.fullName,
                taskName: grade.task?.name,
                date: format(grade.createdAt, 'dd-MM-yyyy'),
              }}
            >
              <strong style={{ color: colors.text.primary }} />
            </Trans>
          </Typography>

          <GradeValueSelect value={value} onChange={setValue} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              disabled={value === grade.value}
              onClick={() => onSubmit(value)}
            >
              {t('common:save')}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => onCancel()}
            >
              {t('common:cancel')}
            </Button>
          </Box>
        </Stack>
      }
    />
  );
}
