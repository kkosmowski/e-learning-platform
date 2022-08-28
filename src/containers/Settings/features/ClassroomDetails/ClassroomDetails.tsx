import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardContent } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import { getClassroom, updateClassroom } from 'api/classroom';
import { Classroom, ClassroomForm } from 'shared/types/classroom';
import {
  mapClassroomDtoToClassroom,
  mapClassroomToUpdateClassroomPayload,
} from 'shared/utils/classroom.utils';
import ClassroomDetailsList from './components/ClassroomDetailsList';
import ClassroomEditForm from './components/ClassroomEditForm';
import { useTranslation } from 'react-i18next';
import { getErrorDetail } from '../../../../shared/utils/common.utils';

interface ClassroomDetailsProps {
  mode: 'view' | 'edit';
}

export default function ClassroomDetails(props: ClassroomDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: classroomId } = useParams<{ id: string }>();
  const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(
    null
  );
  const [error, setError] = useState('');
  const { t } = useTranslation('settings', { keyPrefix: 'classrooms.edit' });
  const navigate = useNavigate();

  const fetchClassroomDetails = async (id: string) => {
    const { data } = await getClassroom(id);
    setCurrentClassroom(mapClassroomDtoToClassroom(data));
  };

  const handleCancel = () => {
    navigate('..', { replace: false });
  };

  const handleSave = async (values: ClassroomForm) => {
    if (currentClassroom && values.teacher) {
      try {
        await updateClassroom(
          mapClassroomToUpdateClassroomPayload({
            id: currentClassroom.id,
            name: values.name,
            teacher: values.teacher,
            students: values.students,
          })
        );
        await fetchClassroomDetails(currentClassroom.id);
        navigate('..', { replace: false });
      } catch (e) {
        setError(getErrorDetail(e));
      }
    }
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
              error={error}
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
