import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import GradeCard from 'shared/components/GradeCard';
import { isStudent, isTeacher } from 'shared/utils/user.utils';
import { useAuth } from 'contexts/auth';
import { useLatestGradesQuery } from 'shared/queries';

interface LatestGradesProps {
  subjectId: string;
  onMoreClick: () => void;
  onAssignGrade: () => void;
}

export default function LatestGrades(props: LatestGradesProps) {
  const { subjectId, onMoreClick, onAssignGrade } = props;
  const { t } = useTranslation('subject');
  const { currentUser } = useAuth();
  const isUserTeacher = isTeacher(currentUser);
  const isUserStudent = isStudent(currentUser);
  const { latestGrades } = useLatestGradesQuery(subjectId);

  return (
    <>
      <SectionTitle>
        <span>
          {isUserTeacher
            ? t('general.assignedGrades')
            : t('general.yourGrades')}
        </span>

        {latestGrades.length && (
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

      <GradeCard grades={latestGrades} showNames keepEmptyColumns />
    </>
  );
}
