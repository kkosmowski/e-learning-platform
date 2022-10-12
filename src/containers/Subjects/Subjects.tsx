import { useEffect, useMemo, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import useCustomNavigate from 'hooks/use-custom-navigate';
import PageLoading from 'shared/components/PageLoading';
import { useSubjectsQuery } from 'shared/hooks';
import { Subject } from 'shared/types/subject';
import { useAuth } from 'contexts/auth';
import ViewHeader from 'shared/components/ViewHeader';
import { Role } from 'shared/types/user';
import SubjectsBatch from './components/SubjectsBatch';
import SubjectsGrid from './components/SubjectsGrid';

enum GroupSubjectsBy {
  None = 'none',
  Category = 'category',
  Class = 'class',
}

const groupByKey = 'groupBy';

const getSubjectsBatch = (
  key: 'category' | 'subjectClass',
  items: Subject[]
) => {
  const labels = Array.from(
    new Set(items.map((item) => item[key].name).sort())
  );
  return labels.map((label) => ({
    label,
    subjects: items.filter((item) => item[key].name === label),
  }));
};

const setGroupByInLocalStorage = (newGroupBy: GroupSubjectsBy) => {
  localStorage.setItem(groupByKey, newGroupBy);
};

const getGroupByFromLocalStorage = (): GroupSubjectsBy | null => {
  const storedGroupBy = localStorage.getItem(groupByKey);
  return storedGroupBy ? (storedGroupBy as GroupSubjectsBy) : null;
};

const defaultGroupBy = GroupSubjectsBy.None;

export default function Subjects() {
  const { navigate } = useCustomNavigate();
  const { currentUser } = useAuth();
  const { subjects, isLoading, isSuccess } = useSubjectsQuery(currentUser);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsGroupBy = searchParams.get(groupByKey) as GroupSubjectsBy;
  const storedGroupBy = getGroupByFromLocalStorage();
  const [groupBy, setGroupBy] = useState<GroupSubjectsBy>(
    searchParamsGroupBy || storedGroupBy || defaultGroupBy
  );
  const isTeacher = useMemo(
    () => currentUser?.role === Role.Teacher,
    [currentUser]
  );
  const { t } = useTranslation('subjects');
  const filteredSubjects = useMemo(() => {
    if (!subjects) return undefined;

    if (isTeacher) {
      if (groupBy === GroupSubjectsBy.Category) {
        return getSubjectsBatch('category', subjects);
      }
      if (groupBy === GroupSubjectsBy.Class) {
        return getSubjectsBatch('subjectClass', subjects);
      }
    }

    return [
      {
        label: <Trans i18nKey="subjects:all" />,
        subjects,
      },
    ];
  }, [subjects, groupBy, isTeacher]);

  const handleSubjectClick = (subjectId: string): void => {
    navigate(subjectId);
  };

  const handleGroupByChange = (event: SelectChangeEvent) => {
    const newGroupBy = event.target.value as GroupSubjectsBy;
    setGroupBy(newGroupBy);
    setGroupByInLocalStorage(newGroupBy);
  };

  useEffect(() => {
    setSearchParams(
      groupBy === GroupSubjectsBy.None ? {} : { [groupByKey]: groupBy }
    );
  }, [groupBy, setSearchParams]);

  const renderSubjects = (subjectsToRender: Subject[]) => {
    if (isTeacher) {
      return filteredSubjects?.map((batch) => (
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
    <>
      {isTeacher && (
        <ViewHeader
          sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}
        >
          <InputLabel id="group-subjects-by-label">{t('groupBy')}</InputLabel>

          <FormControl sx={{ width: 200 }} size="small">
            <Select
              id="group-subjects-by"
              labelId="group-subjects-by-label"
              value={groupBy}
              onChange={handleGroupByChange}
            >
              <MenuItem value={GroupSubjectsBy.None}>{t('none')}</MenuItem>
              <MenuItem value={GroupSubjectsBy.Category}>
                {t('category')}
              </MenuItem>
              <MenuItem value={GroupSubjectsBy.Class}>{t('class')}</MenuItem>
            </Select>
          </FormControl>
        </ViewHeader>
      )}

      <Centered>
        {isLoading && <PageLoading />}

        {isSuccess
          ? subjects?.length
            ? renderSubjects(subjects)
            : t(`noItems.${currentUser?.role}`)
          : null}
      </Centered>
    </>
  );
}
