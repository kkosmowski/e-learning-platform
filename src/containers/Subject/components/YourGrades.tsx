import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import GradeCard from 'shared/components/GradeCard';
import { divideGrades } from 'shared/utils/grade.utils';
import { Grade } from 'shared/types/grade';
import { YOUR_GRADES_VISIBLE_COUNT } from 'shared/consts/grade';
import { isTeacher } from 'shared/utils/user.utils';
import { CURRENT_USER } from 'shared/consts/user';

interface YourGradesProps {
  grades: Grade[];
  onMoreClick: () => void;
  onAssignGrade: () => void;
}

export default function YourGrades(props: YourGradesProps) {
  const { grades, onMoreClick, onAssignGrade } = props;
  const { t } = useTranslation('subject');

  const { assignmentGrades, nonAssignmentGrades } = divideGrades(
    grades,
    YOUR_GRADES_VISIBLE_COUNT
  );

  return (
    <>
      <SectionTitle>
        <span>{t('general.yourGrades')}</span>

        {!!grades.length && (
          <TextButton sx={{ ml: 2 }} onClick={onMoreClick}>
            {t('common:viewMore')}
          </TextButton>
        )}

        {isTeacher(CURRENT_USER) && (
          <TextButton sx={{ ml: 2 }} onClick={onAssignGrade}>
            {t('createNew.grade')}
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
