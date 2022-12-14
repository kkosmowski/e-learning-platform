import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Centered } from 'shared/components/Container';
import GradeCard from 'shared/components/GradeCard';
import TabPanel from 'shared/components/TabPanel';
import SectionTitle from 'shared/components/SectionTitle';
import { divideGrades } from 'shared/utils/grade.utils';
import { useGradesQuery } from 'shared/queries/use-grades-query';
import TextButton from 'shared/components/TextButton';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useEditGrade } from 'shared/hooks';

enum TeacherGradesTab {
  Assignment = 'assignment',
  NonAssignment = 'nonAssignment',
}

export default function SubjectGradesTeacher() {
  const { subjectId } = useParams();
  const { navigate } = useCustomNavigate();
  const { subjectGrades, fetchSubjectGrades } = useGradesQuery();
  const { assignmentGrades, nonAssignmentGrades } = divideGrades(subjectGrades);
  const [currentTab, setCurrentTab] = useState<TeacherGradesTab>(
    TeacherGradesTab.Assignment
  );
  const { options, Dialog } = useEditGrade(subjectGrades);
  const { t } = useTranslation('grade');

  const handleTabChange = (event: SyntheticEvent, tab: TeacherGradesTab) => {
    setCurrentTab(tab);
  };

  const handleAssignGrade = (): void => {
    navigate('./new');
  };

  useEffect(() => {
    if (subjectId) {
      fetchSubjectGrades(subjectId);
    }
  }, [subjectId, fetchSubjectGrades]);

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
        {assignmentGrades.length ? (
          <GradeCard grades={assignmentGrades} showNames options={options} />
        ) : (
          <Card>
            <Typography sx={{ p: 2 }}>{t('noItems')}</Typography>
          </Card>
        )}
      </TabPanel>

      <TabPanel value={TeacherGradesTab.NonAssignment} currentTab={currentTab}>
        {/* @todo: filter & sort */}
        {nonAssignmentGrades.length ? (
          <GradeCard grades={nonAssignmentGrades} showNames options={options} />
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
