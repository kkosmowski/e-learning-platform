import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import CommonViewLayout from 'layouts/CommonView';
import { getClassroom } from 'api/classroom';
import { Classroom } from 'shared/types/classroom';

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
    setCurrentClassroom(data);
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
    <CommonViewLayout headerTitle={currentClassroom.name}>
      {currentClassroom?.name}
    </CommonViewLayout>
  );
}
