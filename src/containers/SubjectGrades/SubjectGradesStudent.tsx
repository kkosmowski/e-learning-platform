import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import GradeCard from 'shared/components/GradeCard';
import { divideGrades } from 'shared/utils/grade.utils';
import { useGradesQuery } from 'shared/queries/use-grades-query';
import VirtualGrades from 'shared/components/VirtualGrades';

export default function SubjectGradesStudent() {
  const { subjectId } = useParams();
  const { t } = useTranslation('grade');
  const { subjectGrades, fetchSubjectGrades } = useGradesQuery();
  const { assignmentGrades, nonAssignmentGrades } = divideGrades(subjectGrades);

  useEffect(() => {
    if (subjectId) {
      fetchSubjectGrades(subjectId);
    }
  }, [subjectId, fetchSubjectGrades]);

  return (
    <Centered innerSx={{ gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <GradeCard
          hideDate
          title={t('type.assignment')}
          grades={assignmentGrades}
          sx={{ flex: 2 }}
        />
        <GradeCard
          hideDate
          shortName
          title={t('type.nonAssignment')}
          grades={nonAssignmentGrades}
          sx={{ flex: 2 }}
        />
      </Box>

      {!!subjectId && (
        <VirtualGrades grades={assignmentGrades} subjectId={subjectId} />
      )}
    </Centered>
  );
}
