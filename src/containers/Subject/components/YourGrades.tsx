import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import SectionTitle from 'shared/components/SectionTitle';
import { grades } from 'shared/consts/subject';
import GradeRow from './GradeRow';

// interface YourGradesProps {
// }

export default function YourGrades() {
// props: YourGradesProps
  // const {  } = props;
  const { t } = useTranslation('subject');

  return (
    <>
      <SectionTitle>
        <span>{t('general.yourGrades')}</span>
      </SectionTitle>

      <Grid>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {grades.map((grade) => (
                <GradeRow key={grade.id} grade={grade} />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
