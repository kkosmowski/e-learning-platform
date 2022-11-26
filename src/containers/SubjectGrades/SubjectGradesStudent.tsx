import { Box, Card, CardContent, styled } from '@mui/material';

import { Centered } from 'shared/components/Container';
import GradeCard from 'shared/components/GradeCard';
import GradeRow from 'shared/components/GradeRow';
import { divideGrades } from 'shared/utils/grade.utils';

export default function SubjectGradesStudent() {
  const { assignmentGrades, nonAssignmentGrades } = divideGrades([]);
  // const averageAssignmentsGrade: Grade = {
  //   id: 'average-grade',
  //   value: average(
  //     assignmentGrades.map((grade) => grade.value),
  //     2
  //   ),
  //   type: GradeType.Average,
  //   createdAt: new Date(),
  //   student: STUDENT,
  // };
  // const proposedSubjectGrade: Grade = {
  //   id: 'proposed-grade',
  //   value: 4.5,
  //   type: GradeType.Proposed,
  //   createdAt: new Date(2022, 5, 26, 23, 52, 11),
  //   student: STUDENT,
  // };
  // const finalSubjectGrade: Grade = {
  //   id: 'final-grade',
  //   value: 0,
  //   type: GradeType.Final,
  //   createdAt: new Date(),
  //   student: STUDENT,
  // };

  return (
    <Centered innerSx={{ gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <GradeCard grades={assignmentGrades} sx={{ flex: 3 }} />
        <GradeCard grades={nonAssignmentGrades} sx={{ flex: 2 }} />
      </Box>

      {/* @todo: change to grid to avoid empty Box */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <ProposedGradeCard sx={{ flex: 3 }}>
          <CardContent>
            {/*<GradeRow grade={averageAssignmentsGrade} hideDate showDivider />*/}
            {/*<GradeRow grade={proposedSubjectGrade} showDivider />*/}
            {/*<GradeRow*/}
            {/*  grade={finalSubjectGrade}*/}
            {/*  hideDate={!finalSubjectGrade.value}*/}
            {/*/>*/}
          </CardContent>
        </ProposedGradeCard>

        <Box sx={{ flex: 2 }} />
      </Box>
    </Centered>
  );
}

const ProposedGradeCard = styled(Card)(() => ({}));
