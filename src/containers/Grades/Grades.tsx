import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LayoutFix from 'layouts/LayoutFix';
import CommonViewLayout from 'layouts/CommonView';
import HomeSidenav from 'containers/HomeSidenav';
import { useGradesSummary } from 'shared/queries/use-grades-summary';
import { SubjectGrades } from 'shared/types/grade';
import PageLoading from 'shared/components/PageLoading';
import CommonTable, { DataRow } from 'shared/components/CommonTable';
import { primary } from 'colors';

const columnKeys = [
  'table.key.subjectName',
  'table.key.averageGrade',
  'table.key.proposedGrade',
  'table.key.finalGrade',
];

const mapSubjectGradesToDataRow = (subjectGrades: SubjectGrades): DataRow => ({
  name: subjectGrades.subjectName,
  averageGrade: subjectGrades.grades.average || '–',
  proposedGrade: subjectGrades.grades.proposed || '–',
  finalGrade:
    (
      <strong style={{ color: primary[500], fontSize: 17 }}>
        {subjectGrades.grades.final}
      </strong>
    ) || '–',
});

export default function Grades() {
  const { t } = useTranslation('grades');
  const { gradesSummary, isLoading, isSuccess } = useGradesSummary();

  const columns = useMemo(() => columnKeys.map((key) => t(key)), [t]);
  const rows = useMemo(
    () => gradesSummary?.map(mapSubjectGradesToDataRow) || [],
    [gradesSummary]
  );

  return (
    <LayoutFix>
      <HomeSidenav />

      <CommonViewLayout maxWidth={800} headerTitle={t('title')}>
        {isSuccess && gradesSummary?.length ? (
          <CommonTable columns={columns} rows={rows} t={t} />
        ) : isLoading ? (
          <PageLoading />
        ) : (
          <>{t('noItems')}</>
        )}
      </CommonViewLayout>
    </LayoutFix>
  );
}
