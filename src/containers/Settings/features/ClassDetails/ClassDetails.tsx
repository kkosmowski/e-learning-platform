import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CommonViewLayout from 'layouts/CommonView';
import ClassDetailsList from './components/ClassDetailsList';
import ClassEditForm from './components/ClassEditForm';
import useClassQuery from './hooks/use-class-query';

interface ClassDetailsProps {
  mode: 'view' | 'edit';
}

export default function ClassDetails(props: ClassDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: classId } = useParams<{ id: string }>();
  const { t } = useTranslation('settings', { keyPrefix: 'classes' });
  const navigate = useNavigate();
  const { currentClass, isSuccess, isLoading, error, updateClass } =
    useClassQuery(classId);

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
      headerTitle={currentClass?.name || ''}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      {isSuccess && currentClass && (
        <>
          {!isEditMode && (
            <Button
              variant="contained"
              sx={{ mr: 'auto' }}
              onClick={navigateToEdit}
            >
              {t('button.edit')}
            </Button>
          )}

          <Card>
            <CardContent>
              {isEditMode ? (
                <ClassEditForm
                  class={currentClass}
                  error={error}
                  onSubmit={updateClass}
                  onCancel={navigateBack}
                />
              ) : (
                <ClassDetailsList class={currentClass} />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </CommonViewLayout>
  );
}
