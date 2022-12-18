import { ReactNode, useMemo } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import LayoutFix from 'layouts/LayoutFix';
import CommonViewLayout from 'layouts/CommonView';
import HomeSidenav from 'containers/HomeSidenav';
import { useGradesSummary } from 'shared/queries/use-grades-summary';
import { SubjectGrades } from 'shared/types/grade';
import PageLoading from 'shared/components/PageLoading';
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

interface DataRow {
  name: string;

  [key: string]: string | number | ReactNode;
}

interface CommonTableProps {
  columns: string[];
  rows: DataRow[];
  t: TFunction;
}

export function CommonTable(props: CommonTableProps) {
  const { columns, rows, t } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((labelKey, i) => (
              <TableCell
                key={labelKey}
                {...(!!i && { align: 'right' })}
                sx={i === 0 ? { width: '100%' } : { width: 1 }}
              >
                {t(labelKey)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {Object.entries(row).map(([key, value], i) => (
                <TableCell key={`${key}-${i}`} {...(!!i && { align: 'right' })}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
