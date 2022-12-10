import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, styled } from '@mui/material';

import { Centered } from 'shared/components/Container';
import GradeCard from 'shared/components/GradeCard';
import { divideGrades } from 'shared/utils/grade.utils';
import { useGradesQuery } from 'shared/queries/use-grades-query';
import {
  VirtualGradeType,
  Grade,
  GradeType,
  VirtualGrade,
} from 'shared/types/grade';
import GradeRow from 'shared/components/GradeRow';
import { useAuth } from 'contexts/auth';
import { useSubjectQuery } from 'shared/queries';

const getAverageGrade = (grades: Grade[]): number =>
  grades.reduce((sum, { value }) => sum + value, 0) / grades.length;

export default function SubjectGradesStudent() {
  const { subjectId } = useParams();
  const { currentUser } = useAuth();
  const { subject } = useSubjectQuery(subjectId, {
    simple: true,
  });
  const { subjectGrades, fetchSubjectGrades } = useGradesQuery();
  const { assignmentGrades, nonAssignmentGrades } = divideGrades(subjectGrades);

  const averageAssignmentsGrade: VirtualGrade = useMemo(
    () => ({
      id: 'average',
      subject: subject!,
      user: currentUser!,
      type: VirtualGradeType.AVERAGE,
      value: getAverageGrade(assignmentGrades),
      createdBy: subject?.teacher,
    }),
    [assignmentGrades, currentUser, subject]
  );

  const proposedSubjectGrade: VirtualGrade = useMemo(
    () => ({
      id: 'proposed',
      subject: subject!,
      user: currentUser!,
      type: VirtualGradeType.PROPOSED,
      createdBy: subject?.teacher,
    }),
    [currentUser, subject]
  );

  const finalSubjectGrade: VirtualGrade = useMemo(
    () => ({
      id: 'final',
      subject: subject!,
      user: currentUser!,
      type: VirtualGradeType.FINAL,
      createdBy: subject?.teacher,
    }),
    [currentUser, subject]
  );

  useEffect(() => {
    if (subjectId) {
      fetchSubjectGrades(subjectId);
    }
  }, [subjectId, fetchSubjectGrades]);

  return (
    <Centered innerSx={{ gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <GradeCard hideDate grades={assignmentGrades} sx={{ flex: 2 }} />
        <GradeCard
          hideDate
          shortName
          grades={nonAssignmentGrades}
          sx={{ flex: 2 }}
        />
      </Box>

      {/* @todo: change to grid to avoid empty Box */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <ProposedGradeCard sx={{ flex: 3 }}>
          <CardContent>
            <GradeRow grade={averageAssignmentsGrade} showDivider />
            <GradeRow grade={proposedSubjectGrade} showDivider />
            <GradeRow grade={finalSubjectGrade} />
          </CardContent>
        </ProposedGradeCard>

        <Box sx={{ flex: 2 }} />
      </Box>
    </Centered>
  );
}

const ProposedGradeCard = styled(Card)(() => ({}));
