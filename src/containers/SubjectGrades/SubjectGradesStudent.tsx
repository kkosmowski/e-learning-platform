import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import GradeCard from 'shared/components/GradeCard';
import { useGradesQuery } from 'shared/queries/use-grades-query';
import VirtualGrades from 'shared/components/VirtualGrades';
import { GradeType } from 'shared/types/grade';

export default function SubjectGradesStudent() {
  const { subjectId } = useParams();
  const { t } = useTranslation('grade');
  const {
    subjectGrades: paginatedAssignmentGrades,
    fetchSubjectGrades: fetchAssignmentGrades,
    isFetchingNextSubjectGradesPage: isFetchingNextAssignmentGradesPage,
    hasNextSubjectGradesPage: hasNextAssignmentGradesPage,
    fetchNextSubjectGradesPage: fetchNextAssignmentGradesPage,
    isSuccess,
    isLoading,
  } = useGradesQuery();
  const {
    subjectGrades: paginatedNonAssignmentGrades,
    fetchSubjectGrades: fetchNonAssignmentGrades,
    isFetchingNextSubjectGradesPage: isFetchingNextNonAssignmentGradesPage,
    hasNextSubjectGradesPage: hasNextNonAssignmentGradesPage,
    fetchNextSubjectGradesPage: fetchNextNonAssignmentGradesPage,
  } = useGradesQuery();
  const assignmentGrades = useMemo(
    () => paginatedAssignmentGrades?.flat() || [],
    [paginatedAssignmentGrades]
  );
  const nonAssignmentGrades = useMemo(
    () => paginatedNonAssignmentGrades?.flat() || [],
    [paginatedNonAssignmentGrades]
  );

  useEffect(() => {
    if (subjectId) {
      fetchAssignmentGrades(subjectId, [GradeType.ASSIGNMENT]);
      fetchNonAssignmentGrades(subjectId, [
        GradeType.ACTIVITY,
        GradeType.BEHAVIOUR,
      ]);
    }
  }, [subjectId, fetchAssignmentGrades, fetchNonAssignmentGrades]);

  return (
    <Centered innerSx={{ gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <GradeCard
          hideDate
          title={t('type.assignment')}
          grades={assignmentGrades}
          sx={{ flex: 2 }}
          paginated
          isFetchingNextPage={isFetchingNextAssignmentGradesPage}
          hasNextPage={hasNextAssignmentGradesPage}
          fetchNextPage={fetchNextAssignmentGradesPage}
        />
        <GradeCard
          hideDate
          shortName
          title={t('type.nonAssignment')}
          grades={nonAssignmentGrades}
          sx={{ flex: 2 }}
          paginated
          isFetchingNextPage={isFetchingNextNonAssignmentGradesPage}
          hasNextPage={hasNextNonAssignmentGradesPage}
          fetchNextPage={fetchNextNonAssignmentGradesPage}
        />
      </Box>

      {!!subjectId && (
        <VirtualGrades grades={assignmentGrades} subjectId={subjectId} />
      )}
    </Centered>
  );
}
