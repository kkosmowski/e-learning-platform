import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardContent } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import useSubjectQuery from './hooks/use-subject-query';
import SubjectDetailsList from './components/SubjectDetailsList';
import SubjectEditForm from './components/SubjectEditForm';
import useCustomNavigate from 'hooks/use-custom-navigate';

interface SubjectDetailsProps {
  mode: 'view' | 'edit';
}

export default function SubjectDetails(props: SubjectDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: subjectId } = useParams<{ id: string }>();
  const { t } = useTranslation('settings', { keyPrefix: 'subjects.details' });
  const { navigate, back } = useCustomNavigate();
  const { currentSubject, isSuccess, isLoading, error, updateSubject } =
    useSubjectQuery(subjectId);

  const navigateToEdit = () => {
    navigate('./edit');
  };

  if (!isLoading && !isSuccess) {
    navigate('/404');
    return null;
  }

  return (
    <CommonViewLayout
      headerTitle={currentSubject?.name || ''}
      maxWidth={600}
      CenteredProps={{ innerSx: { gap: 3 } }}
    >
      {isSuccess && currentSubject && (
        <>
          {!isEditMode && (
            <Button
              variant="contained"
              sx={{ mr: 'auto' }}
              onClick={navigateToEdit}
            >
              {t('buttons.edit')}
            </Button>
          )}

          <Card>
            <CardContent>
              {isEditMode ? (
                <SubjectEditForm
                  subject={currentSubject}
                  error={error}
                  onSubmit={updateSubject}
                  onCancel={() => back()}
                />
              ) : (
                <SubjectDetailsList subject={currentSubject} />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </CommonViewLayout>
  );
}
