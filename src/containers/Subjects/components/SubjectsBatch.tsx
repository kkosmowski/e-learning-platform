import { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

import { SimpleSubject } from 'shared/types/subject';
import SubjectsGrid from './SubjectsGrid';

interface SubjectsBatchProps {
  label: ReactNode;
  subjects: SimpleSubject[];
  onSubjectClick: (subjectId: string) => void;
}

export default function SubjectsBatch(props: SubjectsBatchProps) {
  const { label, subjects, onSubjectClick } = props;

  return (
    <Stack sx={{ gap: 1, mt: 5 }}>
      <Typography variant="h2">{label}</Typography>

      <SubjectsGrid subjects={subjects} onSubjectClick={onSubjectClick} />
    </Stack>
  );
}
