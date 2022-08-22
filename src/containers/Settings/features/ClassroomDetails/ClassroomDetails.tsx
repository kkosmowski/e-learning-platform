import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Box, List, ListItem, styled } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import { getClassroom } from 'api/classroom';
import { Classroom } from 'shared/types/classroom';
import { mapClassroomDtoToClassroom } from 'shared/utils/classroom.utils';

interface ClassroomDetailsProps {
  mode: 'view' | 'edit';
}

export default function ClassroomDetails(props: ClassroomDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: classroomId } = useParams<{ id: string }>();
  const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(
    null
  );

  const fetchClassroomDetails = async (id: string) => {
    const { data } = await getClassroom(id);
    setCurrentClassroom(mapClassroomDtoToClassroom(data));
  };

  useEffect(() => {
    if (classroomId) {
      void fetchClassroomDetails(classroomId);
    }
  }, [classroomId]);

  if (!currentClassroom) {
    return null;
  }

  return (
    <CommonViewLayout
      headerTitle={currentClassroom.name}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      <List>
        <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <ListItemWrapper>
            <span>Name</span>
            <span>{currentClassroom.name}</span>
          </ListItemWrapper>
        </ListItem>

        <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <ListItemWrapper>
            <span>Supervising Teacher</span>
            <span>{currentClassroom.teacher.fullName}</span>
          </ListItemWrapper>
        </ListItem>

        <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <ListItemWrapper>
            <span>Students</span>

            <List disablePadding dense>
              {currentClassroom.students.map((student) => (
                <ListItem key={student.id} disableGutters>
                  {student.fullName}
                </ListItem>
              ))}
            </List>
          </ListItemWrapper>
        </ListItem>
      </List>
    </CommonViewLayout>
  );
}

const ListItemWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'stretch',
  columnGap: 16,
  '> :first-child': {
    flex: 1,
  },
  '> :last-child': {
    flex: 2,
  },
}));
