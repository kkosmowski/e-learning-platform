import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardContent } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import { getClassroom } from 'api/classroom';
import { Classroom } from 'shared/types/classroom';
import { mapClassroomDtoToClassroom } from 'shared/utils/classroom.utils';
import ClassroomDetailsList from './components/ClassroomDetailsList';
import ClassroomEditForm from './components/ClassroomEditForm';
import { useTranslation } from 'react-i18next';

interface ClassroomDetailsProps {
  mode: 'view' | 'edit';
}

export default function ClassroomDetails(props: ClassroomDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: classroomId } = useParams<{ id: string }>();
  const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(
    null
  );
  const { t } = useTranslation('settings', { keyPrefix: 'classrooms.edit' });
  const navigate = useNavigate();

  const fetchClassroomDetails = async (id: string) => {
    const { data } = await getClassroom(id);
    setCurrentClassroom(mapClassroomDtoToClassroom(data));
  };

  const handleCancel = () => {
    navigate('..', { replace: false });
  };

  const handleSave = () => {
    console.log('Save');
    navigate('..', { replace: false });
  };

  const navigateToEdit = () => {
    navigate('./edit', { replace: false });
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
      {!isEditMode && (
        <Button
          variant="contained"
          sx={{ mr: 'auto' }}
          onClick={navigateToEdit}
        >
          {t('editThisClassroom')}
        </Button>
      )}

      <Card>
        <CardContent>
          {isEditMode ? (
            <ClassroomEditForm
              classroom={currentClassroom}
              onSubmit={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ClassroomDetailsList classroom={currentClassroom} />
          )}
        </CardContent>
      </Card>
    </CommonViewLayout>
  );
}
