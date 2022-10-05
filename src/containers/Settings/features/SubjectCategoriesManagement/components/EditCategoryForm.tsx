import { Box, Button, TextField, Tooltip } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface EditCategoryFormProps {
  value: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export default function EditCategoryForm(props: EditCategoryFormProps) {
  const { value, onSubmit, onCancel } = props;
  const [categoryName, setCategoryName] = useState(value);
  const { t } = useTranslation('settings', { keyPrefix: 'subjectCategories' });

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    onSubmit(categoryName);
    onCancel();
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
        value={categoryName}
        placeholder={t('placeholder.name')}
        autoFocus
        sx={{ mr: 'auto' }}
        inputProps={{
          sx: {
            py: '6px',
          },
        }}
        size="small"
        onChange={handleCategoryNameChange}
      />

      <Tooltip
        title={
          !categoryName
            ? t('tooltip.nameCannotBeEmpty')
            : categoryName === value
            ? t('tooltip.nothingToSave')
            : ''
        }
      >
        <span>
          <Button
            type="submit"
            variant="contained"
            disabled={!categoryName || categoryName === value}
            sx={{ py: '5.25px' }}
          >
            {t('common:save')}
          </Button>
        </span>
      </Tooltip>

      <Button
        type="button"
        color="secondary"
        sx={{ py: '5.25px' }}
        onClick={onCancel}
      >
        {t('common:cancel')}
      </Button>
    </Box>
  );
}
