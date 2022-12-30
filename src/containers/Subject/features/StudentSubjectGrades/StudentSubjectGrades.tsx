import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';

import {
  useCreateGradeQuery,
  useGradesQuery,
  useUsersQuery,
} from 'shared/queries';
import { GradeCard, VirtualGrades } from 'containers/Subject/components';
import { Centered } from 'shared/components/Container';
import SectionTitle from 'shared/components/SectionTitle';
import { VirtualGradeType } from 'shared/types/grade';
import { useConfirmationDialog } from 'shared/hooks';
import FinalGradeDialog, {
  FinalGradeDialogType,
} from './components/FinalGradeDialog';
import { getAverageGrade } from 'shared/utils/grade.utils';
import colors from 'colors';
import PageLoading from 'shared/components/PageLoading';

export default function StudentSubjectGrades() {
  const { subjectId, studentId } = useParams();
  const { fetchUser, currentUser: student } = useUsersQuery();
  const {
    handleCreateProposed: createProposedGrade,
    handleUpdateProposed: updateProposedGrade,
    handleCreateFinal: createFinalGrade,
  } = useCreateGradeQuery();
  const {
    studentGrades: paginatedStudentGrades,
    isFetchingNextStudentGradesPage: isFetchingNextPage,
    hasNextStudentGradesPage: hasNextPage,
    fetchNextStudentGradesPage: fetchNextPage,
    isLoading,
    isSuccess,
    fetchStudentGrades,
  } = useGradesQuery();
  const studentGrades = useMemo(
    () => paginatedStudentGrades?.flat(),
    [paginatedStudentGrades]
  );
  const averageGrade = studentGrades?.length
    ? getAverageGrade(studentGrades)
    : 0;
  const { t } = useTranslation('user');
  const [finalGradeDialogType, setFinalGradeDialogType] =
    useState<FinalGradeDialogType | null>(null);
  const { confirmAction, confirmationDialog } = useConfirmationDialog();

  const proposedGrade = studentGrades?.find(
    (grade) => grade.type === VirtualGradeType.PROPOSED
  );
  const hasProposedGrade = !!proposedGrade;
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

  const openFinalGradeDialog = (type: FinalGradeDialogType) => {
    setFinalGradeDialogType(type);
  };

  const closeFinalGradeDialog = () => {
    setFinalGradeDialogType(null);
  };

  const handleFinalGradeDialogSubmit = (
    type: FinalGradeDialogType,
    value: number
  ) => {
    if (type === 'propose' || type === 'change') {
      void handleProposeFinalGrade(value, type);
    } else {
      void handleConfirmFinalGrade(value);
    }
  };

  const proposeFinalGrade = (value: number) => {
    if (subjectId && studentId) {
      createProposedGrade({ subjectId, studentId, value });
    }
  };

  const updateProposition = (value: number) => {
    if (subjectId && studentId) {
      updateProposedGrade({ subjectId, studentId, value });
    }
  };

  const confirmFinalGrade = () => {
    if (subjectId && studentId) {
      createFinalGrade({ subjectId, studentId });
    }
  };

  const handleProposeFinalGrade = async (
    value: number,
    type: 'propose' | 'change'
  ) => {
    const shouldPropose = await confirmAction({
      title: 'grade:final.confirm.proposeTitle',
      message: (
        <Trans
          i18nKey={'grade:final.confirm.proposeMessage'}
          values={{ value: String(value), studentName: student?.fullName }}
        >
          <strong style={{ color: colors.text.primary }} />
        </Trans>
      ),
      confirmColor: 'primary',
      confirmLabel: `grade:${type}`,
    });

    if (shouldPropose) {
      closeFinalGradeDialog();
      if (type === 'propose') {
        proposeFinalGrade(value);
      } else {
        updateProposition(value);
      }
    }
  };

  const handleConfirmFinalGrade = async (value: number) => {
    const shouldConfirm = await confirmAction({
      title: 'grade:final.confirm.confirmTitle',
      message: (
        <Trans
          i18nKey={'grade:final.confirm.confirmMessage'}
          values={{ value: String(value), studentName: student?.fullName }}
        >
          <strong style={{ color: colors.text.primary }} />
        </Trans>
      ),
      confirmColor: 'primary',
      confirmLabel: 'confirm',
    });

    if (shouldConfirm) {
      closeFinalGradeDialog();
      confirmFinalGrade();
    }
  };

  return (
    <Centered
      innerSx={{ gap: 2, overflow: 'hidden' }}
      sx={{ overflow: 'hidden' }}
    >
      <SectionTitle>
        <Typography sx={{ font: 'inherit', fontWeight: 600, mr: 2 }}>
          {t('grades.title')}
        </Typography>
        {student?.fullName}
      </SectionTitle>

      {isSuccess && studentGrades?.length && !!subjectId ? (
        <>
          <GradeCard
            grades={studentGrades}
            sx={{ overflow: 'hidden' }}
            paginated
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />

          <VirtualGrades grades={studentGrades} subjectId={subjectId} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={hasFinalGrade}
              onClick={() =>
                openFinalGradeDialog(hasProposedGrade ? 'change' : 'propose')
              }
            >
              {t(`grade:${hasProposedGrade ? 'change' : 'propose'}`)}
            </Button>

            <Button
              variant="contained"
              color="primary"
              disabled={!hasProposedGrade || hasFinalGrade}
              onClick={() => openFinalGradeDialog('confirm')}
            >
              {t('grade:confirm')}
            </Button>
          </Box>
        </>
      ) : isLoading ? (
        <PageLoading />
      ) : (
        <Typography color="text.secondary">{t('grades.noItems')}</Typography>
      )}

      {!!finalGradeDialogType && !!student && (
        <FinalGradeDialog
          type={finalGradeDialogType}
          student={student}
          averageGrade={averageGrade}
          proposedGrade={proposedGrade?.value}
          onSubmit={handleFinalGradeDialogSubmit}
          onClose={closeFinalGradeDialog}
        />
      )}

      {confirmationDialog}
    </Centered>
  );
}
