import { useMemo, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import useCustomNavigate from 'hooks/use-custom-navigate';
import PageLoading from 'shared/components/PageLoading';
import { useSubjectsQuery } from 'shared/hooks';
import { Subject } from 'shared/types/subject';
import { useAuth } from 'contexts/auth';
import ViewHeader from '../../layouts/Application/components/ViewHeader';
import SubjectsBatch from './components/SubjectsBatch';

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

export default function Subjects() {
  const { navigate } = useCustomNavigate();
  const { currentUser } = useAuth();
  const { subjects, isLoading, isSuccess } = useSubjectsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [groupBy, setGroupBy] = useState<GroupSubjectsBy>(
    (searchParams.get(groupByKey) as GroupSubjectsBy) || GroupSubjectsBy.None
  );
  const { t } = useTranslation('subjects');
  const filteredSubjects = useMemo(() => {
    if (!subjects) return undefined;

    if (groupBy === GroupSubjectsBy.Category) {
      return getSubjectsBatch('category', subjects);
    }
    if (groupBy === GroupSubjectsBy.Class) {
      return getSubjectsBatch('subjectClass', subjects);
    }

    return [
      {
        label: 'All',
        subjects,
      },
    ];
  }, [subjects, groupBy]);

  const handleSubjectClick = (subjectId: string): void => {
    navigate(subjectId);
  };

  const handleGroupByChange = (event: SelectChangeEvent) => {
    const newGroupBy = event.target.value as GroupSubjectsBy;
    setGroupBy(newGroupBy);
    setSearchParams(
      newGroupBy === GroupSubjectsBy.None ? {} : { [groupByKey]: newGroupBy }
    );
  };

  return (
    <>
      <ViewHeader sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
        <InputLabel id="group-subjects-by-label">Group by</InputLabel>

        <FormControl sx={{ width: 200 }} size="small">
          <Select
            id="group-subjects-by"
            labelId="group-subjects-by-label"
            value={groupBy}
            onChange={handleGroupByChange}
          >
            <MenuItem value={GroupSubjectsBy.None}>None</MenuItem>
            <MenuItem value={GroupSubjectsBy.Category}>
              Subject category
            </MenuItem>
            <MenuItem value={GroupSubjectsBy.Class}>Class</MenuItem>
          </Select>
        </FormControl>
      </ViewHeader>

      <Centered>
        {isLoading && <PageLoading />}

        {isSuccess
          ? subjects?.length
            ? filteredSubjects?.map((batch) => (
                <SubjectsBatch
                  key={batch.label}
                  {...batch}
                  onSubjectClick={handleSubjectClick}
                />
              ))
            : t(`noItems.${currentUser?.role}`)
          : null}
      </Centered>
    </>
  );
}
