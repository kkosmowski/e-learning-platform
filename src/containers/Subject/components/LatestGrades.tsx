import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import SectionTitle from 'shared/components/SectionTitle';
import TextButton from 'shared/components/TextButton';
import GradeCard from 'shared/components/GradeCard';
import { isTeacher } from 'shared/utils/user.utils';
import { useAuth } from 'contexts/auth';
import { useLatestGradesQuery } from 'shared/queries';
import { useEditGrade } from 'shared/hooks';
import PageLoading from 'shared/components/PageLoading';

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
  const { latestGrades, isLoading, isSuccess } =
    useLatestGradesQuery(subjectId);
  const { options, Dialog } = useEditGrade(latestGrades, isUserTeacher);

  return (
    <>
      <SectionTitle>
        <span>
          {isUserTeacher
            ? t('general.assignedGrades')
            : t('general.yourGrades')}
        </span>

        {!!latestGrades.length && (
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

      {isSuccess ? (
        latestGrades.length ? (
          <GradeCard
            grades={latestGrades}
            showNames={isUserTeacher}
            keepEmptyColumns={isUserTeacher}
            options={options}
          />
        ) : (
          <Typography color="text.secondary">{t('grade:noItems')}</Typography>
        )
      ) : isLoading ? (
        <PageLoading />
      ) : null}

      {Dialog}
    </>
  );
}
