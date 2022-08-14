import { Box, Button, TextField, Tooltip } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateNewCategoryFormProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export default function CreateNewCategoryForm(
  props: CreateNewCategoryFormProps
) {
  const { onSubmit, onCancel } = props;
  const [newCategoryName, setNewCategoryName] = useState('');
  const { t } = useTranslation('settings');

  const handleNewCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(newCategoryName);
    onCancel();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        value={newCategoryName}
        placeholder={t('subjectCategories.categoryNamePlaceholder')}
        autoFocus
        sx={{ mr: 'auto' }}
        size="small"
        onChange={handleNewCategoryNameChange}
      />

      <Tooltip
        title={
          !newCategoryName.trim()
            ? t('subjectCategories.nameCannotBeEmptyTooltip')
            : ''
        }
      >
        <span>
          <Button
            variant="contained"
            disabled={!newCategoryName.trim()}
            onClick={handleSubmit}
          >
            {t('subjectCategories.create')}
          </Button>
        </span>
      </Tooltip>

      <Button color="secondary" onClick={onCancel}>
        {t('common:cancel')}
      </Button>
    </Box>
  );
}
