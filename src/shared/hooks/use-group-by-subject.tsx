import { useCallback, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { SimpleSubject } from 'shared/types/subject';
import { usePreferences } from 'contexts/preferences';
import { GroupSubjectsBy } from 'shared/consts/shared';

const getSubjectsBatch = (
  key: 'category' | 'subjectClass',
  items: SimpleSubject[]
) => {
  const labels = Array.from(
    new Set(items.map((item) => item[key].name).sort())
  );
  return labels.map((label) => ({
    label,
    subjects: items.filter((item) => item[key].name === label),
  }));
};

export const useGroupBySubject = (
  subjects: SimpleSubject[] | undefined,
  isTeacher: boolean
) => {
  const { groupBy, setGroupBy } = usePreferences();
  const { t } = useTranslation('subjects');

  const groupedSubjects = useMemo(() => {
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

  const handleGroupByChange = useCallback(
    (event: SelectChangeEvent) => {
      setGroupBy(event.target.value as GroupSubjectsBy);
    },
    [setGroupBy]
  );

  const GroupSubjects = useMemo(
    () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <InputLabel id="group-by-label">{t('groupBy')}</InputLabel>

        <FormControl sx={{ width: 200 }} size="small">
          <Select
            id="group-by"
            labelId="group-by-label"
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
      </Box>
    ),
    [groupBy, handleGroupByChange, t]
  );

  return {
    groupedSubjects,
    GroupSubjects,
  };
};
