import { useEffect, useMemo } from 'react';
import { Button, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

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

  const navigateToEdit = () => {
    navigate('edit');
  };

  useEffect(() => {
    console.log('test');
  }, []);

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
                  onCancel={() => navigate(-1)}
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
