import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';

import { useGradesQuery, useUsersQuery } from 'shared/queries';
import GradeCard from 'shared/components/GradeCard';
import VirtualGrades from 'shared/components/VirtualGrades';
import { Centered } from 'shared/components/Container';
import SectionTitle from 'shared/components/SectionTitle';
import { VirtualGradeType } from 'shared/types/grade';
import { useConfirmationDialog } from 'shared/hooks';
import FinalGradeDialog from './components/FinalGradeDialog';
import { getAverageGrade } from 'shared/utils/grade.utils';

export default function StudentSubjectGrades() {
  const { subjectId, studentId } = useParams();
  const { fetchUser, currentUser: student } = useUsersQuery();
  const { fetchStudentGrades, studentGrades } = useGradesQuery();
  const averageGrade = studentGrades?.length
    ? getAverageGrade(studentGrades)
    : 0;
  const { t } = useTranslation('user');
  const [finalGradeDialogState, setFinalGradeDialogState] = useState<
    'propose' | 'confirm' | null
  >(null);
  const { confirmAction, confirmationDialog } = useConfirmationDialog();

  const hasProposedGrade = !!studentGrades?.find(
    (grade) => grade.type === VirtualGradeType.PROPOSED
  );
  const hasFinalGrade = !!studentGrades?.find(
    (grade) => grade.type === VirtualGradeType.FINAL
  );

  useEffect(() => {
    if (studentId) {
      fetchUser(studentId);
    }
  }, [fetchUser, studentId]);

  useEffect(() => {
    if (student?.id) {
      fetchStudentGrades(student.id);
    }
  }, [fetchStudentGrades, student?.id]);

  const openFinalGradeDialog = (type: 'propose' | 'confirm') => {
    setFinalGradeDialogState(type);
  };

  const closeFinalGradeDialog = () => {
    setFinalGradeDialogState(null);
  };

  const handleFinalGradeDialogSubmit = (
    type: 'propose' | 'confirm',
    value: number
  ) => {
    if (type === 'propose') {
      void handleProposeFinalGrade(value);
    } else {
      void handleConfirmFinalGrade(value);
    }
  };

  const proposeFinalGrade = (value: number) => {};
  const confirmFinalGrade = () => {};

  const handleProposeFinalGrade = async (value: number) => {
    const shouldPropose = await confirmAction({
      title: 'grade:final.confirm.proposeTitle',
      message: (
        <Trans
          i18nKey={'grade:final.confirm.proposeMessage'}
          values={{ value: String(value), studentName: student?.fullName }}
        >
          <strong />
        </Trans>
      ),
      confirmColor: 'primary',
      confirmLabel: 'grade:propose',
    });

    if (shouldPropose) proposeFinalGrade(value);
  };

  const handleConfirmFinalGrade = async (value: number) => {
    const shouldConfirm = await confirmAction({
      title: 'grade:final.confirm.confirmTitle',
      message: (
        <Trans
          i18nKey={'grade:final.confirm.confirmMessage'}
          values={{ value: String(value), studentName: student?.fullName }}
        >
          <strong />
        </Trans>
      ),
      confirmColor: 'primary',
      confirmLabel: 'confirm',
    });

    if (shouldConfirm) confirmFinalGrade();
  };

  return (
    <Centered innerSx={{ gap: 2 }}>
      <SectionTitle>
        <Typography sx={{ font: 'inherit', fontWeight: 600, mr: 2 }}>
          {t('grades')}
        </Typography>
        {student?.fullName}
      </SectionTitle>

      {studentGrades?.length && !!subjectId ? (
        <>
          <GradeCard grades={studentGrades} />

          <VirtualGrades grades={studentGrades} subjectId={subjectId} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => openFinalGradeDialog('propose')}
            >
              {t('grade:final.proposeFinalGrade')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!hasProposedGrade || hasFinalGrade}
              onClick={() => openFinalGradeDialog('confirm')}
            >
              {t('grade:final.confirmFinalGrade')}
            </Button>
          </Box>
        </>
      ) : (
        <>{t('noItems')}</>
      )}

      {!!finalGradeDialogState && !!student && (
        <FinalGradeDialog
          state={finalGradeDialogState}
          student={student}
          averageGrade={averageGrade}
          onSubmit={handleFinalGradeDialogSubmit}
          onClose={closeFinalGradeDialog}
        />
      )}

      {confirmationDialog}
    </Centered>
  );
}
