import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PageLoading from 'shared/components/PageLoading';
import { useSubjectsQuery } from 'shared/queries';
import { SimpleSubject } from 'shared/types/subject';
import { useAuth } from 'contexts/auth';
import { Role } from 'shared/types/user';
import SubjectsBatch from './components/SubjectsBatch';
import SubjectsGrid from './components/SubjectsGrid';
import LayoutFix from 'layouts/LayoutFix';
import CommonViewLayout from 'layouts/CommonView';
import HomeSidenav from 'containers/HomeSidenav';
import { useGroupBySubject } from 'shared/hooks';
import { groupByKey, GroupSubjectsBy } from 'shared/consts/shared';
import { usePreferences } from 'contexts/preferences';

export default function Subjects() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [, setSearchParams] = useSearchParams();
  const { groupBy } = usePreferences();
  const { subjects, isLoading, isSuccess } = useSubjectsQuery({
    simple: true,
  });
  const isTeacher = useMemo(
    () => currentUser?.role === Role.Teacher,
    [currentUser]
  );
  const { groupedSubjects, GroupSubjects } = useGroupBySubject(
    subjects,
    isTeacher
  );
  const { t } = useTranslation('subjects');

  useEffect(() => {
    if (isTeacher) {
      setSearchParams(
        groupBy === GroupSubjectsBy.None ? {} : { [groupByKey]: groupBy }
      );
    }
  }, [groupBy, isTeacher, setSearchParams]);

  const handleSubjectClick = (subjectId: string): void => {
    navigate(subjectId);
  };

  const renderSubjects = (subjectsToRender: SimpleSubject[]) => {
    if (isTeacher) {
      return groupedSubjects?.map((batch) => (
        <SubjectsBatch
          key={batch.label as string}
          {...batch}
          onSubjectClick={handleSubjectClick}
        />
      ));
    }

    return (
      <SubjectsGrid
        subjects={subjectsToRender}
        onSubjectClick={handleSubjectClick}
      />
    );
  };

  return (
    <LayoutFix>
      <HomeSidenav />

      <CommonViewLayout
        hideBackButton
        {...(isTeacher && { headerTitle: GroupSubjects })}
      >
        {isLoading && <PageLoading />}

        {isSuccess
          ? subjects?.length
            ? renderSubjects(subjects)
            : t(`noItems.${currentUser?.role}`)
          : null}
      </CommonViewLayout>
    </LayoutFix>
  );
}
