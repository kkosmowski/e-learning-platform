import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import { Grade } from 'shared/types/subject';
import GradeCard from './GradeCard';

interface YourGradesProps {
  grades: Grade[];
  onMoreClick: () => void;
}

const divideGrades = (grades: Grade[]): [Grade[], Grade[]] => {
  const assignmentGrades: Grade[] = [];
  const nonAssignmentGrades: Grade[] = [];

  for (const grade of grades) {
    if (grade.source) {
      assignmentGrades.push(grade);
    } else {
      nonAssignmentGrades.push(grade);
    }
  }

  return [assignmentGrades, nonAssignmentGrades];
};

export default function YourGrades(props: YourGradesProps) {
  const { grades, onMoreClick } = props;
  const { t } = useTranslation('subject');

  const [assignmentGrades, nonAssignmentGrades] = divideGrades(grades);

  return (
    <>
      <SectionTitle>
        <span>{t('general.yourGrades')}</span>

        {!!grades.length && (
          <TextButton sx={{ ml: 2 }} onClick={onMoreClick}>
            {t('common:viewMore')}
          </TextButton>
        )}
      </SectionTitle>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <GradeCard grades={assignmentGrades} sx={{ flex: 3 }} />
        <GradeCard grades={nonAssignmentGrades} sx={{ flex: 2 }} />
      </Box>
    </>
  );
}
