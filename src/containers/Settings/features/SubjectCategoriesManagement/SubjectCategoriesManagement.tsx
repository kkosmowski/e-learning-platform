import { useTranslation } from 'react-i18next';
import { Button, IconButton, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered } from 'shared/components/Container';

const fakeList = [
  { name: 'Math', id: 'mc3g342j' },
  { name: 'PE', id: 'k34ji5t' },
  { name: 'English', id: '13gonjmd' },
  { name: 'Physics', id: 'hg54prks' },
  { name: 'Biology', id: 'myo543ko' },
];

export default function SubjectCategoriesManagement() {
  const { t } = useTranslation('settings', { keyPrefix: 'subjectCategories' });

  const showCreateNewCategoryForm = () => {
    console.log('show form');
  };

  return (
    <>
      <ViewHeader title={t('title')} />

      <Centered innerSx={{ alignItems: 'flex-start', maxWidth: 600, gap: 3 }}>
        <Button variant="contained" onClick={showCreateNewCategoryForm}>
          {t('createNew')}
        </Button>

        <List sx={{ width: '100%' }}>
          {fakeList.map(({ id, name }) => (
            <ListItem
              key={id}
              divider
              secondaryAction={
                <>
                  <IconButton color="primary" aria-label={t('common:edit')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" aria-label={t('common:delete')}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              sx={{
                py: 1.5,
              }}
            >
              {name}
            </ListItem>
          ))}
        </List>
      </Centered>
    </>
  );
}
