import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

import { Centered } from 'shared/components/Container';
import { GradeCard } from 'containers/Subject/components';
import TabPanel from 'shared/components/TabPanel';
import SectionTitle from 'shared/components/SectionTitle';
import { useGradesQuery } from 'shared/queries/use-grades-query';
import TextButton from 'shared/components/TextButton';
import { useEditGrade } from 'shared/hooks';
import PageLoading from 'shared/components/PageLoading';
import { GradeType } from 'shared/types/grade';

enum TeacherGradesTab {
  Assignment = 'assignment',
  NonAssignment = 'nonAssignment',
}

export default function SubjectGradesTeacher() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const {
    subjectGrades: paginatedAssignmentGrades,
    fetchSubjectGrades: fetchAssignmentGrades,
    isFetchingNextSubjectGradesPage: isFetchingNextAssignmentGradesPage,
    hasNextSubjectGradesPage: hasNextAssignmentGradesPage,
    fetchNextSubjectGradesPage: fetchNextAssignmentGradesPage,
    isSuccess,
    isLoading,
  } = useGradesQuery();
  const {
    subjectGrades: paginatedNonAssignmentGrades,
    fetchSubjectGrades: fetchNonAssignmentGrades,
    isFetchingNextSubjectGradesPage: isFetchingNextNonAssignmentGradesPage,
    hasNextSubjectGradesPage: hasNextNonAssignmentGradesPage,
    fetchNextSubjectGradesPage: fetchNextNonAssignmentGradesPage,
  } = useGradesQuery();
  const assignmentGrades = useMemo(
    () => paginatedAssignmentGrades?.flat() || [],
    [paginatedAssignmentGrades]
  );
  const nonAssignmentGrades = useMemo(
    () => paginatedNonAssignmentGrades?.flat() || [],
    [paginatedNonAssignmentGrades]
  );

  useEffect(() => {
    if (subjectId) {
      fetchAssignmentGrades(subjectId, [GradeType.ASSIGNMENT]);
      fetchNonAssignmentGrades(subjectId, [
        GradeType.ACTIVITY,
        GradeType.BEHAVIOUR,
      ]);
    }
  }, [subjectId, fetchAssignmentGrades, fetchNonAssignmentGrades]);

  const [currentTab, setCurrentTab] = useState<TeacherGradesTab>(
    TeacherGradesTab.Assignment
  );

  const { options, Dialog } = useEditGrade(
    currentTab === TeacherGradesTab.Assignment
      ? assignmentGrades
      : nonAssignmentGrades
  );
  const { t } = useTranslation('grade');

  const handleTabChange = (event: SyntheticEvent, tab: TeacherGradesTab) => {
    setCurrentTab(tab);
  };

  const handleAssignGrade = (): void => {
    navigate('./new');
  };

  return (
    <Centered>
      <SectionTitle>
        <span>{t('title.assignedGrades')}</span>

        <TextButton sx={{ ml: 2 }} onClick={handleAssignGrade}>
          {t('create.title')}
        </TextButton>
      </SectionTitle>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Grade tabs"
        >
          <Tab
            label={t('type.assignment')}
            value={TeacherGradesTab.Assignment}
          />
          <Tab
            label={t('type.nonAssignment')}
            value={TeacherGradesTab.NonAssignment}
          />
        </Tabs>
      </Box>

      <TabPanel value={TeacherGradesTab.Assignment} currentTab={currentTab}>
        {/* @todo: filter & sort */}
        {isSuccess && assignmentGrades.length ? (
          <GradeCard
            grades={assignmentGrades}
            showNames
            options={options}
            paginated
            isFetchingNextPage={isFetchingNextAssignmentGradesPage}
            hasNextPage={hasNextAssignmentGradesPage}
            fetchNextPage={fetchNextAssignmentGradesPage}
          />
        ) : (
          <Card>
            {isLoading ? (
              <PageLoading px />
            ) : (
              <Typography sx={{ p: 2 }}>{t('noItems')}</Typography>
            )}
          </Card>
        )}
      </TabPanel>

      <TabPanel value={TeacherGradesTab.NonAssignment} currentTab={currentTab}>
        {/* @todo: filter & sort */}
        {nonAssignmentGrades.length ? (
          <GradeCard
            grades={nonAssignmentGrades}
            showNames
            options={options}
            paginated
            isFetchingNextPage={isFetchingNextNonAssignmentGradesPage}
            hasNextPage={hasNextNonAssignmentGradesPage}
            fetchNextPage={fetchNextNonAssignmentGradesPage}
          />
        ) : (
          <Card>
            <Typography sx={{ p: 2 }}>{t('noItems')}</Typography>
          </Card>
        )}
      </TabPanel>

      {Dialog}
    </Centered>
  );
}
