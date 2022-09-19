import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import CommonViewLayout from 'layouts/CommonView';
import { getClassroom, updateClassroom } from 'api/classroom';
import {
  Classroom,
  ClassroomForm,
  GetClassroomResponse,
  UpdateClassroomResponse,
} from 'shared/types/classroom';
import {
  mapClassroomDtoToClassroom,
  mapClassroomToUpdateClassroomPayload,
} from 'shared/utils/classroom.utils';
import ClassroomDetailsList from './components/ClassroomDetailsList';
import ClassroomEditForm from './components/ClassroomEditForm';
import { getErrorDetail } from 'shared/utils/common.utils';

interface ClassroomDetailsProps {
  mode: 'view' | 'edit';
}

export default function ClassroomDetails(props: ClassroomDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: classroomId } = useParams<{ id: string }>();
  const [error, setError] = useState('');
  const { t } = useTranslation('settings', { keyPrefix: 'classrooms.edit' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: currentClassroom,
    isSuccess,
    isLoading,
  } = useQuery<GetClassroomResponse, AxiosError, Classroom>(
    ['classroom', classroomId],
    () => {
      if (classroomId) return getClassroom(classroomId);
      else throw new Error('Classroom id is missing');
    },
    {
      enabled: Boolean(classroomId),
      select: ({ data }) => mapClassroomDtoToClassroom(data),
    }
  );

  const navigateBack = () => {
    navigate('..', { replace: false });
  };

  const { mutate: handleSave } = useMutation<
    UpdateClassroomResponse,
    AxiosError,
    ClassroomForm
  >(
    async (values: ClassroomForm) => {
      if (currentClassroom && values.teacher) {
        return updateClassroom(
          mapClassroomToUpdateClassroomPayload({
            id: currentClassroom.id,
            name: values.name,
            teacher: values.teacher,
            students: values.students,
          })
        );
      } else throw new Error('Classroom id is missing');
    },
    {
      onSuccess: async ({ data }) => {
        await queryClient.invalidateQueries(['classroom', classroomId]);
        queryClient.setQueryData(['classroom', classroomId], { data });
        navigateBack();
        toast.success('Classroom updated');
      },
      onError: (e) => {
        setError(getErrorDetail(e));
        toast.error('There was an error');
      },
    }
  );

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
      {isSuccess && (
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
                  onSubmit={handleSave}
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
