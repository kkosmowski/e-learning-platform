import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Centered } from 'shared/components/Container';
import GradeCard from 'shared/components/GradeCard';
import TabPanel from 'shared/components/TabPanel';
import SectionTitle from 'shared/components/SectionTitle';
import { divideGrades } from 'shared/utils/grade.utils';

enum TeacherGradesTab {
  Assignment = 'assignment',
  NonAssignment = 'nonAssignment',
}

export default function SubjectGradesTeacher() {
  const { assignmentGrades, nonAssignmentGrades } = divideGrades([]);
  const [currentTab, setCurrentTab] = useState<TeacherGradesTab>(
    TeacherGradesTab.Assignment
  );
  const { t } = useTranslation('subject', { keyPrefix: 'grades' });

  const handleTabChange = (event: SyntheticEvent, tab: TeacherGradesTab) => {
    setCurrentTab(tab);
  };

  return (
    <Centered>
      <SectionTitle>{t('title')}</SectionTitle>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Grade tabs"
        >
          <Tab
            label={t('assignmentGrades')}
            value={TeacherGradesTab.Assignment}
          />
          <Tab
            label={t('nonAssignmentGrades')}
            value={TeacherGradesTab.NonAssignment}
          />
        </Tabs>
      </Box>

      <TabPanel value={TeacherGradesTab.Assignment} currentTab={currentTab}>
        {/* @todo: filter & sort */}
        <GradeCard grades={assignmentGrades} showNames />
      </TabPanel>

      <TabPanel value={TeacherGradesTab.NonAssignment} currentTab={currentTab}>
        {/* @todo: filter & sort */}
        <GradeCard grades={nonAssignmentGrades} showNames />
      </TabPanel>
    </Centered>
  );
}
