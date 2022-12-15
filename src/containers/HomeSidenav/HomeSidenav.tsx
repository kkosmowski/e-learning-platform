import { useTranslation } from 'react-i18next';

import { Sidenav } from 'layouts/Application/components';
import { useSubjectsQuery } from 'shared/queries';
import PageLoading from 'shared/components/PageLoading';
import SideSubjectMenu from './components/SideSubjectMenu';

export default function HomeSidenav() {
  const { subjects, isLoading, isSuccess } = useSubjectsQuery({ simple: true });
  const { t } = useTranslation('subject');

  return (
    <Sidenav>
      {isSuccess ? (
        subjects?.length ? (
          <SideSubjectMenu subjects={subjects} />
        ) : (
          <>{t('noItems')}</>
        )
      ) : (
        isLoading && <PageLoading />
      )}
    </Sidenav>
  );
}
