import { Fragment, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { Centered } from 'shared/components/Container';
import useCustomNavigate from 'hooks/use-custom-navigate';
import PageLoading from 'shared/components/PageLoading';
import useSubjectsQuery from '../Settings/features/SubjectsManagement/hooks/use-subjects-query';
import { useSearchParams } from 'react-router-dom';

enum GroupSubjectsBy {
  None = 'none',
  Category = 'category',
  Class = 'class',
}

export default function Subjects() {
  const { navigate } = useCustomNavigate();
  const { subjects, isLoading, isSuccess } = useSubjectsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [groupBy, setGroupBy] = useState<GroupSubjectsBy>(
    (searchParams.get('groupBy') as GroupSubjectsBy) || GroupSubjectsBy.None
  );
  const filteredSubjects = useMemo(() => {
    if (!subjects) return undefined;

    if (groupBy === GroupSubjectsBy.Category) {
      const categories = Array.from(
        new Set(subjects.map(({ category }) => category.name).sort())
      );

      return categories.map((categoryName) => ({
        label: categoryName,
        subjects: subjects.filter(
          (subject) => subject.category.name === categoryName
        ),
      }));
    }
    if (groupBy === GroupSubjectsBy.Class) {
      const classes = Array.from(
        new Set(subjects.map(({ subjectClass }) => subjectClass.name).sort())
      );

      return classes.map((className) => ({
        label: className,
        subjects: subjects.filter(
          (subject) => subject.subjectClass.name === className
        ),
      }));
    }
    return [
      {
        label: 'All',
        subjects,
      },
    ];
  }, [subjects, groupBy]);

  const handleSubjectClick = (subjectId: string): void => {
    navigate(subjectId);
  };

  const handleGroupByChange = (event: SelectChangeEvent) => {
    const newGroupBy = event.target.value as GroupSubjectsBy;
    setGroupBy(newGroupBy);
    setSearchParams(
      newGroupBy === GroupSubjectsBy.None ? {} : { groupBy: newGroupBy }
    );
  };

  return (
    <Centered innerSx={{ gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <InputLabel id="group-subjects-by-label">Group by</InputLabel>

        <FormControl sx={{ width: 200 }} size="small">
          <Select
            id="group-subjects-by"
            labelId="group-subjects-by-label"
            value={groupBy}
            onChange={handleGroupByChange}
          >
            <MenuItem value={GroupSubjectsBy.None}>None</MenuItem>
            <MenuItem value={GroupSubjectsBy.Category}>
              Subject category
            </MenuItem>
            <MenuItem value={GroupSubjectsBy.Class}>Class</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isLoading && <PageLoading />}
      {isSuccess &&
        filteredSubjects &&
        filteredSubjects.map(({ label, subjects }) => (
          <Fragment key={label}>
            <Typography>{label}</Typography>

            <Grid container spacing={2}>
              {subjects?.map((subject) => (
                <Grid item key={subject.id} xs={12} md={6} lg={4} xl={3}>
                  <Card onClick={() => handleSubjectClick(subject.id)}>
                    <CardActionArea>
                      <CardContent>
                        <Typography component="h2">{subject.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fragment>
        ))}
    </Centered>
  );
}
