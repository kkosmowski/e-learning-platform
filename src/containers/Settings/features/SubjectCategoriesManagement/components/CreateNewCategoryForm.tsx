import { Box, Button, TextField, Tooltip } from '@mui/material';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation('settings', { keyPrefix: 'subjectCategories' });

  const handleNewCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    onSubmit(newCategoryName);
    setNewCategoryName('');
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        inputRef={inputRef}
        value={newCategoryName}
        placeholder={t('placeholder.name')}
        autoFocus
        sx={{ mr: 'auto' }}
        size="small"
        onChange={handleNewCategoryNameChange}
      />

      <Tooltip
        title={!newCategoryName.trim() ? t('tooltip.nameCannotBeEmpty') : ''}
      >
        <span>
          <Button
            variant="contained"
            type="submit"
            disabled={!newCategoryName.trim()}
          >
            {t('button.create')}
          </Button>
        </span>
      </Tooltip>

      <Button type="button" color="secondary" onClick={onCancel}>
        {t('common:cancel')}
      </Button>
    </Box>
  );
}
