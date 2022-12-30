import { useMemo } from 'react';
import { Box, Card, CardContent } from '@mui/material';

import { useAuth } from 'contexts/auth';
import { useSubjectQuery } from 'shared/queries';
import { Grade, VirtualGrade, VirtualGradeType } from 'shared/types/grade';
import GradeRow from './GradeRow';
import { getAverageGrade } from 'shared/utils/grade.utils';

interface VirtualGradesProps {
  grades: Grade[];
  subjectId: string;
}

export default function VirtualGrades(props: VirtualGradesProps) {
  const { grades, subjectId } = props;
  const { currentUser } = useAuth();
  const { subject } = useSubjectQuery(subjectId, {
    full: true,
  });

  const averageGrade: VirtualGrade | null = useMemo(() => {
    if (!currentUser || !subject) return null;

    return {
      id: 'average',
      subject: subject,
      user: currentUser,
      type: VirtualGradeType.AVERAGE,
      value: getAverageGrade(grades),
      createdBy: subject?.teacher,
    };
  }, [grades, currentUser, subject]);

  const defaultProposedGrade: VirtualGrade | null = useMemo(() => {
    if (!currentUser || !subject) return null;

    return {
      id: 'proposed',
      subject: subject,
      user: currentUser,
      type: VirtualGradeType.PROPOSED,
      createdBy: subject?.teacher,
    };
  }, [currentUser, subject]);

  const defaultFinalGrade: VirtualGrade | null = useMemo(() => {
    if (!currentUser || !subject) return null;

    return {
      id: 'final',
      subject: subject,
      user: currentUser,
      type: VirtualGradeType.FINAL,
      createdBy: subject?.teacher,
    };
  }, [currentUser, subject]);

  const proposedGrade = useMemo(
    () =>
      grades.filter(({ type }) => type == VirtualGradeType.PROPOSED)[0] ||
      defaultProposedGrade,
    [grades, defaultProposedGrade]
  );

  const finalGrade = useMemo(
    () =>
      grades.filter(({ type }) => type == VirtualGradeType.FINAL)[0] ||
      defaultFinalGrade,
    [grades, defaultFinalGrade]
  );

  if (!averageGrade || !proposedGrade || !finalGrade) return null;

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Card sx={{ flex: 3 }}>
        <CardContent>
          <GradeRow grade={averageGrade} showDivider />
          <GradeRow grade={proposedGrade} showDivider />
          <GradeRow grade={finalGrade} />
        </CardContent>
      </Card>

      <Box sx={{ flex: 2 }} />
    </Box>
  );
}
