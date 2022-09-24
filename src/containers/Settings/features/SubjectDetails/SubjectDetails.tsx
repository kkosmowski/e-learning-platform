import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardContent } from '@mui/material';

import CommonViewLayout from 'layouts/CommonView';
import useSubjectQuery from './hooks/use-subject-query';
// import SubjectEditForm from './components/SubjectEditForm';
// import SubjectDetailsList from './components/SubjectDetailsList';

interface SubjectDetailsProps {
  mode: 'view' | 'edit';
}

export default function SubjectDetails(props: SubjectDetailsProps) {
  const isEditMode = useMemo(() => props.mode === 'edit', [props.mode]);
  const { id: subjectId } = useParams<{ id: string }>();
  const { t } = useTranslation('settings', { keyPrefix: 'subjects.details' });
  const navigate = useNavigate();
  const { currentSubject, isSuccess, isLoading, error /*updateSubject*/ } =
    useSubjectQuery(subjectId);

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
              {t('editThisSubject')}
            </Button>
          )}

          <Card>
            <CardContent>
              {/*{isEditMode ? (*/}
              {/*  <SubjectEditForm*/}
              {/*    classroom={currentSubject}*/}
              {/*    error={error}*/}
              {/*    // onSubmit={updateSubject}*/}
              {/*    onCancel={navigateBack}*/}
              {/*  />*/}
              {/*) : (*/}
              {/*  <SubjectDetailsList classroom={currentSubject} />*/}
              {/*)}*/}
            </CardContent>
          </Card>
        </>
      )}
    </CommonViewLayout>
  );
}
