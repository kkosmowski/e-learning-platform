import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GlobalStyles,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { background } from 'colors';
import { Subject } from 'shared/types/subject';

interface SubjectsTableProps {
  subjects: Subject[];
  onClick: (subjectId: string) => void;
  onClassroomClick: (classroomId: string) => void;
  onTeacherClick: (userId: string) => void;
}

const subjectsTableHeadRows = [
  'subjects.table.subjectCategory',
  'subjects.table.classroom',
  'subjects.table.teacher',
];

export default function SubjectsTable(props: SubjectsTableProps) {
  const { subjects, onClick, onClassroomClick, onTeacherClick } = props;
  const { t } = useTranslation();

  const handleClassroomClick = (event: MouseEvent, classroomId: string) => {
    event.stopPropagation();
    onClassroomClick(classroomId);
  };

  const handleTeacherClick = (event: MouseEvent, userId: string) => {
    event.stopPropagation();
    onTeacherClick(userId);
  };

  return (
    <Table size="small">
      <TableStyles />
      <SubjectsTableHead />
      <TableBody>
        {subjects.map((subject) => (
          <StyledTableRow key={subject.id} onClick={() => onClick(subject.id)}>
            <TableCell className="subjects-table__row--category">
              {subject.category.name}
            </TableCell>
            <TableCell
              className="subjects-table__row--classroom --clickable"
              onClick={(event) =>
                handleClassroomClick(event, subject.classroom.id)
              }
            >
              {subject.classroom.name}
            </TableCell>
            <TableCell
              className="subjects-table__row--teacher --clickable"
              onClick={(event) => handleTeacherClick(event, subject.teacher.id)}
            >
              {subject.teacher.fullName}
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const SubjectsTableHead = () => {
  const { t } = useTranslation('settings');
  return (
    <TableHead>
      <TableRow>
        {subjectsTableHeadRows.map((headRow) => (
          <TableCell
            key={headRow}
            className={`subjects-table__row--${headRow}`}
          >
            <Typography fontSize="inherit" color="secondary">
              {t(headRow)}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableStyles = () => (
  <GlobalStyles
    styles={{
      '.subjects-table__row--category': {
        width: '35%',
      },
      '.subjects-table__row--classroom': {
        width: '27.5%',
      },
      '.subjects-table__row--teacher': {
        width: '37.5%',
      },
      '.--clickable:hover': {
        textDecoration: 'underline',
      },
    }}
  />
);

const StyledTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: background[200],
  },
}));
