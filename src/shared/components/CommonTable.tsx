import { ReactNode } from 'react';
import { TFunction } from 'react-i18next';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export interface DataRow {
  name: string;
  [key: string]: string | number | ReactNode;
}

interface CommonTableProps {
  columns: string[];
  rows: DataRow[];
  t: TFunction;
}

export default function CommonTable(props: CommonTableProps) {
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
