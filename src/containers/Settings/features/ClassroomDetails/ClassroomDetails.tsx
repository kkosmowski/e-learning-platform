import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CommonViewLayout from 'layouts/CommonView';
import ClassroomDetailsList from './components/ClassroomDetailsList';
import ClassroomEditForm from './components/ClassroomEditForm';
import useClassroomQuery from './hooks/use-classroom-query';

interface ClassroomDetailsProps {
  mode: 'view' | 'edit';
}

export default function ClassroomDetails(props: ClassroomDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: classroomId } = useParams<{ id: string }>();
  const { t } = useTranslation('settings', { keyPrefix: 'classrooms.edit' });
  const navigate = useNavigate();
  const { currentClassroom, isSuccess, isLoading, error, updateClassroom } =
    useClassroomQuery(classroomId);

  const navigateBack = () => {
    navigate('..', { replace: false });
  };

  const navigateToEdit = () => {
    navigate('./edit', { replace: false });
  };

  if (!isLoading && !isSuccess) {
    navigate('/404');
    return null;
  }

  return (
    <CommonViewLayout
      headerTitle={currentClassroom?.name || ''}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      {isSuccess && currentClassroom && (
        <>
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
                  onSubmit={updateClassroom}
                  onCancel={navigateBack}
                />
              ) : (
                <ClassroomDetailsList classroom={currentClassroom} />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </CommonViewLayout>
  );
}
