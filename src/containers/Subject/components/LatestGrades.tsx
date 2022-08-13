import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import GradeCard from 'shared/components/GradeCard';
import { divideGrades } from 'shared/utils/grade.utils';
import { Grade } from 'shared/types/grade';
import {
  LATEST_GRADES_VISIBLE_STUDENT_COUNT,
  LATEST_GRADES_VISIBLE_TEACHER_COUNT,
} from 'shared/consts/grade';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { CURRENT_USER } from 'shared/consts/user';

interface LatestGradesProps {
  grades: Grade[];
  onMoreClick: () => void;
  onAssignGrade: () => void;
}

export default function LatestGrades(props: LatestGradesProps) {
  const { grades, onMoreClick, onAssignGrade } = props;
  const { t } = useTranslation('subject');
  const isUserTeacher = isTeacher(CURRENT_USER);
  const isUserStudent = isStudent(CURRENT_USER);

  let assignmentGrades: Grade[] = [];
  let nonAssignmentGrades: Grade[] = [];

  if (isUserStudent) {
    const dividedGrades = divideGrades(
      grades,
      LATEST_GRADES_VISIBLE_STUDENT_COUNT
    );
    assignmentGrades = dividedGrades.assignmentGrades;
    nonAssignmentGrades = dividedGrades.nonAssignmentGrades;
  }

  return (
    <>
      <SectionTitle>
        <span>
          {isUserTeacher
            ? t('general.assignedGrades')
            : t('general.yourGrades')}
        </span>

        {!!grades.length && (
          <TextButton sx={{ ml: 2 }} onClick={onMoreClick}>
            {t('common:viewMore')}
          </TextButton>
        )}

        {isUserTeacher && (
          <TextButton sx={{ ml: 2 }} onClick={onAssignGrade}>
            {t('createNew.grade')}
          </TextButton>
        )}
      </SectionTitle>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {isUserTeacher && (
          <GradeCard
            grades={grades.slice(0, LATEST_GRADES_VISIBLE_TEACHER_COUNT)}
            sx={{ flex: 1 }}
            showNames
            keepEmptyColumns
          />
        )}

        {isUserStudent && (
          <>
            <GradeCard grades={assignmentGrades} sx={{ flex: 3 }} />
            <GradeCard grades={nonAssignmentGrades} sx={{ flex: 2 }} />
          </>
        )}
      </Box>
    </>
  );
}